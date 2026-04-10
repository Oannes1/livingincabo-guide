#!/usr/bin/env python3
"""
Build the Living In Cabo "Buying Property in Mexico" PDF guide.
Renders pdf-content.md into a branded PDF using reportlab.
"""

import os
import re
import sys
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

# ─── Brand colors ─────────────────────────────────────────────────
CABO_NAVY = colors.HexColor("#0A2540")
CABO_NAVY_DEEP = colors.HexColor("#04111F")
CABO_SLATE = colors.HexColor("#1B3A5C")
SAND_GOLD = colors.HexColor("#C9A96E")
SAND_GOLD_DARK = colors.HexColor("#A8893D")
SAND_GOLD_LIGHT = colors.HexColor("#EFE6D1")
CREAM = colors.HexColor("#F5F2ED")
STONE = colors.HexColor("#D9D0C5")
TEXT_BODY = colors.HexColor("#2A3A4A")
TEXT_MUTED = colors.HexColor("#5A7A9A")

REPO_ROOT = Path(__file__).resolve().parent.parent
CONTENT_MD = REPO_ROOT / "pdf-content.md"
OUTPUT_PDF = REPO_ROOT / "public" / "downloads" / "buying-property-in-mexico-guide.pdf"

PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN = 0.85 * inch


# ─── Page decorations ─────────────────────────────────────────────
def cover_page(canvas, doc):
    canvas.saveState()
    # Full navy background
    canvas.setFillColor(CABO_NAVY)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)

    # Gold accent bar at top
    canvas.setFillColor(SAND_GOLD)
    canvas.rect(0, PAGE_HEIGHT - 0.4 * inch, PAGE_WIDTH, 0.08 * inch, fill=1, stroke=0)

    # Small label top left
    canvas.setFillColor(SAND_GOLD)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(MARGIN, PAGE_HEIGHT - 1.1 * inch, "LIVING IN CABO  ·  BUYER'S GUIDE")

    # Thin line under label
    canvas.setStrokeColor(SAND_GOLD)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, PAGE_HEIGHT - 1.18 * inch, MARGIN + 1.8 * inch, PAGE_HEIGHT - 1.18 * inch)

    # Footer brand line
    canvas.setFillColor(SAND_GOLD)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(MARGIN, 0.6 * inch, "livingincabo.com   ·   In partnership with Ronival Real Estate")
    canvas.setStrokeColor(SAND_GOLD)
    canvas.setLineWidth(0.3)
    canvas.line(MARGIN, 0.8 * inch, PAGE_WIDTH - MARGIN, 0.8 * inch)

    canvas.restoreState()


def content_page(canvas, doc):
    canvas.saveState()
    # Cream background
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)

    # Top band with gold accent
    canvas.setFillColor(CABO_NAVY)
    canvas.rect(0, PAGE_HEIGHT - 0.5 * inch, PAGE_WIDTH, 0.5 * inch, fill=1, stroke=0)
    canvas.setFillColor(SAND_GOLD)
    canvas.rect(0, PAGE_HEIGHT - 0.55 * inch, PAGE_WIDTH, 0.04 * inch, fill=1, stroke=0)

    # Header text
    canvas.setFillColor(SAND_GOLD)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawString(MARGIN, PAGE_HEIGHT - 0.32 * inch, "BUYING PROPERTY IN MEXICO  ·  THE COMPLETE GUIDE")
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#D4BC85"))
    canvas.drawRightString(PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 0.32 * inch, "livingincabo.com")

    # Footer
    canvas.setStrokeColor(SAND_GOLD)
    canvas.setLineWidth(0.4)
    canvas.line(MARGIN, 0.7 * inch, PAGE_WIDTH - MARGIN, 0.7 * inch)

    canvas.setFillColor(CABO_NAVY)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawString(MARGIN, 0.5 * inch, "LIVING IN CABO")
    canvas.setFillColor(TEXT_MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(MARGIN + 0.9 * inch, 0.5 * inch, "·  Buying Property in Mexico 2026")

    # Page number
    canvas.setFillColor(SAND_GOLD_DARK)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawRightString(PAGE_WIDTH - MARGIN, 0.5 * inch, f"{doc.page}")

    canvas.restoreState()


# ─── Styles ────────────────────────────────────────────────────────
def build_styles():
    base = getSampleStyleSheet()

    styles = {}
    styles["CoverLabel"] = ParagraphStyle(
        "CoverLabel",
        fontName="Helvetica-Bold",
        fontSize=11,
        textColor=SAND_GOLD,
        leading=14,
        spaceAfter=8,
        alignment=TA_LEFT,
    )
    styles["CoverTitle"] = ParagraphStyle(
        "CoverTitle",
        fontName="Times-Roman",
        fontSize=48,
        textColor=colors.white,
        leading=52,
        spaceBefore=0,
        spaceAfter=12,
        alignment=TA_LEFT,
    )
    styles["CoverSubtitle"] = ParagraphStyle(
        "CoverSubtitle",
        fontName="Times-Italic",
        fontSize=20,
        textColor=SAND_GOLD,
        leading=26,
        spaceAfter=24,
        alignment=TA_LEFT,
    )
    styles["CoverTagline"] = ParagraphStyle(
        "CoverTagline",
        fontName="Helvetica",
        fontSize=12,
        textColor=colors.HexColor("#D4BC85"),
        leading=18,
        spaceAfter=8,
        alignment=TA_LEFT,
    )
    styles["CoverByline"] = ParagraphStyle(
        "CoverByline",
        fontName="Helvetica",
        fontSize=10,
        textColor=colors.HexColor("#C9A96E"),
        leading=14,
        alignment=TA_LEFT,
    )
    styles["ChapterLabel"] = ParagraphStyle(
        "ChapterLabel",
        fontName="Helvetica-Bold",
        fontSize=10,
        textColor=SAND_GOLD_DARK,
        leading=12,
        spaceBefore=4,
        spaceAfter=4,
    )
    styles["H1"] = ParagraphStyle(
        "H1",
        fontName="Times-Roman",
        fontSize=30,
        textColor=CABO_NAVY,
        leading=34,
        spaceBefore=12,
        spaceAfter=20,
    )
    styles["H2"] = ParagraphStyle(
        "H2",
        fontName="Times-Roman",
        fontSize=20,
        textColor=CABO_NAVY,
        leading=24,
        spaceBefore=20,
        spaceAfter=10,
    )
    styles["H3"] = ParagraphStyle(
        "H3",
        fontName="Helvetica-Bold",
        fontSize=13,
        textColor=CABO_SLATE,
        leading=16,
        spaceBefore=12,
        spaceAfter=6,
    )
    styles["Body"] = ParagraphStyle(
        "Body",
        fontName="Helvetica",
        fontSize=10.5,
        textColor=TEXT_BODY,
        leading=16,
        spaceAfter=9,
        alignment=TA_LEFT,
    )
    styles["BodyJustify"] = ParagraphStyle(
        "BodyJustify",
        parent=styles["Body"],
        alignment=TA_JUSTIFY,
    )
    styles["Bullet"] = ParagraphStyle(
        "Bullet",
        parent=styles["Body"],
        leftIndent=14,
        bulletIndent=2,
        spaceAfter=5,
    )
    styles["Numbered"] = ParagraphStyle(
        "Numbered",
        parent=styles["Body"],
        leftIndent=18,
        bulletIndent=2,
        spaceAfter=6,
    )
    styles["TOCItem"] = ParagraphStyle(
        "TOCItem",
        fontName="Helvetica",
        fontSize=11,
        textColor=CABO_SLATE,
        leading=22,
        spaceAfter=2,
    )
    styles["BlockquoteBody"] = ParagraphStyle(
        "BlockquoteBody",
        fontName="Times-Italic",
        fontSize=11.5,
        textColor=CABO_NAVY,
        leading=17,
        leftIndent=12,
        spaceAfter=8,
    )
    styles["CalloutTitle"] = ParagraphStyle(
        "CalloutTitle",
        fontName="Helvetica-Bold",
        fontSize=10,
        textColor=SAND_GOLD_DARK,
        leading=13,
        spaceAfter=4,
    )
    styles["CalloutBody"] = ParagraphStyle(
        "CalloutBody",
        fontName="Helvetica",
        fontSize=10,
        textColor=CABO_NAVY,
        leading=14,
    )
    return styles


# ─── Markdown → Flowables ─────────────────────────────────────────
INLINE_BOLD_RE = re.compile(r"\*\*(.+?)\*\*")
INLINE_ITALIC_RE = re.compile(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)")


def inline_md_to_html(text: str) -> str:
    """Convert inline markdown (bold, italic, escapes) to reportlab HTML."""
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = INLINE_BOLD_RE.sub(r"<b>\1</b>", text)
    text = INLINE_ITALIC_RE.sub(r"<i>\1</i>", text)
    text = text.replace("—", "&mdash;")
    text = text.replace("–", "&ndash;")
    return text


def parse_markdown(md: str):
    """Parse the pdf-content.md into a list of section blocks."""
    lines = md.split("\n")
    blocks = []
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Horizontal rule
        if stripped == "---":
            blocks.append(("hr", None))
            i += 1
            continue

        # Headings
        if stripped.startswith("# "):
            blocks.append(("h1", stripped[2:].strip()))
            i += 1
            continue
        if stripped.startswith("## "):
            blocks.append(("h2", stripped[3:].strip()))
            i += 1
            continue
        if stripped.startswith("### "):
            blocks.append(("h3", stripped[4:].strip()))
            i += 1
            continue

        # Table
        if stripped.startswith("|") and i + 1 < len(lines) and lines[i + 1].strip().startswith("|"):
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                table_lines.append(lines[i].strip())
                i += 1
            blocks.append(("table", table_lines))
            continue

        # Unordered list
        if stripped.startswith("- ") or stripped.startswith("* "):
            items = []
            while i < len(lines) and (lines[i].strip().startswith("- ") or lines[i].strip().startswith("* ")):
                s = lines[i].strip()
                items.append(s[2:].strip())
                i += 1
            blocks.append(("ul", items))
            continue

        # Ordered list
        if re.match(r"^\d+\.\s", stripped):
            items = []
            while i < len(lines) and re.match(r"^\d+\.\s", lines[i].strip()):
                items.append(re.sub(r"^\d+\.\s", "", lines[i].strip()))
                i += 1
            blocks.append(("ol", items))
            continue

        # Blank
        if stripped == "":
            i += 1
            continue

        # Paragraph (collect until blank or block element)
        para_lines = []
        while i < len(lines):
            l = lines[i]
            if l.strip() == "":
                break
            if l.strip().startswith(("#", "- ", "* ", "|")) or re.match(r"^\d+\.\s", l.strip()):
                break
            if l.strip() == "---":
                break
            para_lines.append(l.strip())
            i += 1
        if para_lines:
            blocks.append(("p", " ".join(para_lines)))

    return blocks


def build_table(table_lines, styles):
    """Convert markdown table lines into a reportlab Table."""
    # Filter out separator lines (| --- | --- |)
    rows = []
    for line in table_lines:
        if re.match(r"^\|[\s\-:|]+\|$", line):
            continue
        # Split on |, strip, discard empty leading/trailing
        cells = [c.strip() for c in line.strip("|").split("|")]
        rows.append(cells)

    if not rows:
        return None

    # Wrap each cell in a Paragraph
    para_style_header = ParagraphStyle(
        "TableHeader",
        fontName="Helvetica-Bold",
        fontSize=9.5,
        textColor=colors.white,
        leading=12,
    )
    para_style_body = ParagraphStyle(
        "TableBody",
        fontName="Helvetica",
        fontSize=9.5,
        textColor=TEXT_BODY,
        leading=12,
    )

    data = []
    for r_idx, row in enumerate(rows):
        rendered = []
        for cell in row:
            style = para_style_header if r_idx == 0 else para_style_body
            rendered.append(Paragraph(inline_md_to_html(cell), style))
        data.append(rendered)

    col_count = len(rows[0])
    available_width = PAGE_WIDTH - 2 * MARGIN
    col_width = available_width / col_count

    tbl = Table(data, colWidths=[col_width] * col_count, repeatRows=1)
    tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), CABO_NAVY),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("LINEBELOW", (0, 0), (-1, 0), 1.5, SAND_GOLD),
                ("LINEBELOW", (0, 1), (-1, -1), 0.4, STONE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return tbl


def build_callout(title: str, body_flowables, styles):
    """Wrap a title and flowables in a callout table with gold background."""
    inner = [[Paragraph(title, styles["CalloutTitle"])]]
    for f in body_flowables:
        inner.append([f])
    callout = Table(inner, colWidths=[PAGE_WIDTH - 2 * MARGIN - 24])
    callout.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SAND_GOLD_LIGHT),
                ("LINEBEFORE", (0, 0), (0, -1), 3, SAND_GOLD_DARK),
                ("LEFTPADDING", (0, 0), (-1, -1), 14),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    return callout


def blocks_to_flowables(blocks, styles):
    """Convert parsed blocks into reportlab flowables, with special handling
    for the cover section, what's inside TOC, and chapter boundaries."""
    flowables = []

    # ─── Cover page ────────────────────────────────────────
    # First h1 = book title, first h2 = subtitle, first few paragraphs = cover text
    # We'll manually consume the first section up to the first "---"
    i = 0
    cover_items = []
    while i < len(blocks) and blocks[i][0] != "hr":
        cover_items.append(blocks[i])
        i += 1

    # Build cover
    flowables.append(Spacer(1, 1.4 * inch))
    flowables.append(Paragraph("THE 2026 EDITION", styles["CoverLabel"]))
    flowables.append(Spacer(1, 0.25 * inch))
    # Book title
    title_text = cover_items[0][1] if cover_items and cover_items[0][0] == "h1" else "Buying Property in Mexico"
    flowables.append(Paragraph(title_text, styles["CoverTitle"]))
    flowables.append(Spacer(1, 0.15 * inch))
    # Subtitle (first h2)
    subtitle = ""
    for b in cover_items:
        if b[0] == "h2":
            subtitle = b[1]
            break
    if subtitle:
        flowables.append(Paragraph(subtitle, styles["CoverSubtitle"]))

    # Tagline (first p)
    tagline = ""
    for b in cover_items:
        if b[0] == "p":
            tagline = b[1]
            break
    if tagline:
        # Strip **markdown** for cleaner rendering on cover
        clean_tag = re.sub(r"\*\*(.+?)\*\*", r"\1", tagline)
        flowables.append(Spacer(1, 0.2 * inch))
        flowables.append(Paragraph(clean_tag, styles["CoverTagline"]))

    # Byline — the second paragraph in cover items
    p_count = 0
    for b in cover_items:
        if b[0] == "p":
            p_count += 1
            if p_count == 2:
                flowables.append(Spacer(1, 0.4 * inch))
                flowables.append(Paragraph(b[1], styles["CoverByline"]))
                break

    flowables.append(PageBreak())

    # Skip the horizontal rule
    i += 1

    # ─── Remaining content ────────────────────────────────
    buffer_callout = None  # collect "Welcome" section into callout — no, we'll render normally
    in_toc = False
    toc_items_rendered = False

    while i < len(blocks):
        kind, val = blocks[i]

        if kind == "hr":
            flowables.append(Spacer(1, 0.2 * inch))
            i += 1
            continue

        if kind == "h1":
            # Chapter title — page break, label + big title
            flowables.append(PageBreak())
            flowables.append(Spacer(1, 0.4 * inch))
            # If it's a chapter, extract chapter number for label
            m = re.match(r"Chapter\s+(\d+):\s*(.+)", val)
            if m:
                flowables.append(Paragraph(f"CHAPTER {m.group(1)}", styles["ChapterLabel"]))
                flowables.append(Spacer(1, 0.08 * inch))
                # Gold line
                gold_line = Table([[""]], colWidths=[0.6 * inch], rowHeights=[1.5])
                gold_line.setStyle(
                    TableStyle([("LINEABOVE", (0, 0), (-1, -1), 1.5, SAND_GOLD)])
                )
                flowables.append(gold_line)
                flowables.append(Spacer(1, 0.16 * inch))
                flowables.append(Paragraph(m.group(2), styles["H1"]))
            else:
                # Regular h1 — treat as section break
                flowables.append(Paragraph(val, styles["H1"]))
            flowables.append(Spacer(1, 0.1 * inch))
            i += 1
            continue

        if kind == "h2":
            flowables.append(Paragraph(val, styles["H2"]))
            i += 1
            continue

        if kind == "h3":
            flowables.append(Paragraph(val, styles["H3"]))
            i += 1
            continue

        if kind == "p":
            html = inline_md_to_html(val)
            flowables.append(Paragraph(html, styles["Body"]))
            i += 1
            continue

        if kind == "ul":
            for item in val:
                bullet_text = f"• {inline_md_to_html(item)}"
                flowables.append(Paragraph(bullet_text, styles["Bullet"]))
            flowables.append(Spacer(1, 0.05 * inch))
            i += 1
            continue

        if kind == "ol":
            for idx, item in enumerate(val, start=1):
                num_text = f"<b>{idx}.</b>  {inline_md_to_html(item)}"
                flowables.append(Paragraph(num_text, styles["Numbered"]))
            flowables.append(Spacer(1, 0.05 * inch))
            i += 1
            continue

        if kind == "table":
            tbl = build_table(val, styles)
            if tbl:
                flowables.append(Spacer(1, 0.08 * inch))
                flowables.append(tbl)
                flowables.append(Spacer(1, 0.15 * inch))
            i += 1
            continue

        i += 1

    return flowables


# ─── Main ──────────────────────────────────────────────────────────
def main():
    if not CONTENT_MD.exists():
        print(f"ERROR: Content file not found at {CONTENT_MD}", file=sys.stderr)
        sys.exit(1)

    md = CONTENT_MD.read_text(encoding="utf-8")
    blocks = parse_markdown(md)
    styles = build_styles()
    flowables = blocks_to_flowables(blocks, styles)

    # Document setup with separate templates for cover and content
    doc = BaseDocTemplate(
        str(OUTPUT_PDF),
        pagesize=letter,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN + 0.15 * inch,
        bottomMargin=MARGIN + 0.1 * inch,
        title="Buying Property in Mexico — The Complete 2026 Guide",
        author="Living In Cabo",
        subject="Real Estate Buying Guide",
    )

    cover_frame = Frame(
        MARGIN, MARGIN, PAGE_WIDTH - 2 * MARGIN, PAGE_HEIGHT - 2 * MARGIN,
        id="cover", showBoundary=0,
    )
    content_frame = Frame(
        MARGIN, MARGIN, PAGE_WIDTH - 2 * MARGIN, PAGE_HEIGHT - 2 * MARGIN - 0.2 * inch,
        id="content", showBoundary=0,
    )

    doc.addPageTemplates([
        PageTemplate(id="Cover", frames=cover_frame, onPage=cover_page),
        PageTemplate(id="Content", frames=content_frame, onPage=content_page),
    ])

    # Insert a marker to switch templates after the cover
    from reportlab.platypus.doctemplate import NextPageTemplate

    final_flowables = []
    seen_break = False
    for f in flowables:
        if not seen_break and isinstance(f, PageBreak):
            # Switch to content template after cover page
            final_flowables.append(NextPageTemplate("Content"))
            final_flowables.append(f)
            seen_break = True
        else:
            final_flowables.append(f)

    doc.build(final_flowables)
    size_kb = OUTPUT_PDF.stat().st_size / 1024
    print(f"✓ PDF built: {OUTPUT_PDF}")
    print(f"  Size: {size_kb:.1f} KB")


if __name__ == "__main__":
    main()
