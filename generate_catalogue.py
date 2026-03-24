"""Generate a sporting events catalogue PDF booklet for Ortus Club."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch, mm

WIDTH, HEIGHT = A4
OUTPUT = "public/ortus-sporting-catalogue.pdf"

BLACK = HexColor("#1a1a1a")
GOLD = HexColor("#F7BE68")
DARK_GREEN = HexColor("#484D49")
WHITE = HexColor("#FFFFFF")
LIGHT_BG = HexColor("#F4F4F4")
GRAY = HexColor("#666666")

events = [
    {"sport": "Formula 1", "event": "Monaco Grand Prix", "date": "May 23-25, 2026", "location": "Monte Carlo, Monaco",
     "desc": "Experience the most glamorous race on the F1 calendar from an exclusive hospitality suite overlooking the harbour chicane. Network with C-suite peers as the cars thunder through the streets of Monaco."},
    {"sport": "Football", "event": "Champions League Final", "date": "May 30, 2026", "location": "Munich, Germany",
     "desc": "Premium executive box at Europe's biggest club match. Pre-match reception, gourmet dining, and post-match networking with senior leaders from across the continent."},
    {"sport": "Golf", "event": "The Open Championship", "date": "July 16-19, 2026", "location": "Royal Portrush, N. Ireland",
     "desc": "The Championship hospitality village with curated networking. Walk the fairways with fellow executives, enjoy fine dining, and build relationships in golf's most storied setting."},
    {"sport": "Tennis", "event": "Wimbledon Finals Weekend", "date": "July 11-12, 2026", "location": "London, England",
     "desc": "Debenture seats on Centre Court for the men's and women's finals. Exclusive Ortus Club lounge with champagne reception and curated introductions."},
    {"sport": "Basketball", "event": "NBA London Game", "date": "January 15, 2027", "location": "The O2, London",
     "desc": "Courtside suite experience at the NBA's annual London showcase. An electric atmosphere for meaningful executive conversations."},
    {"sport": "Horse Racing", "event": "Royal Ascot", "date": "June 16-20, 2026", "location": "Ascot, England",
     "desc": "The Royal Enclosure experience — five days of world-class racing, fine dining, and unparalleled networking in British sport's most prestigious social gathering."},
    {"sport": "Rugby", "event": "Six Nations — England vs France", "date": "March 14, 2027", "location": "Twickenham, London",
     "desc": "Executive suite hospitality at the most anticipated fixture of the Six Nations. Pre-match lunch, premium views, and post-match reception."},
    {"sport": "Sailing", "event": "America's Cup", "date": "October 2026", "location": "Barcelona, Spain",
     "desc": "VIP waterfront hospitality at sailing's ultimate competition. Yacht access, race village networking, and curated dinners with senior executives."},
]


def draw_cover(c):
    c.setFillColor(BLACK)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1)
    # Gold accent line
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.line(WIDTH/2 - 80, HEIGHT/2 + 60, WIDTH/2 + 80, HEIGHT/2 + 60)
    # Title
    c.setFillColor(WHITE)
    c.setFont("Times-Italic", 42)
    c.drawCentredString(WIDTH/2, HEIGHT/2 + 100, "The Ortus Club")
    c.setFont("Helvetica-Light" if "Helvetica-Light" in c.getAvailableFonts() else "Helvetica", 14)
    c.setFillColor(GOLD)
    c.drawCentredString(WIDTH/2, HEIGHT/2 + 20, "SPORTING EVENTS CATALOGUE")
    c.setFillColor(HexColor("#999999"))
    c.setFont("Helvetica", 11)
    c.drawCentredString(WIDTH/2, HEIGHT/2 - 20, "2026 — 2027 Season")
    # Bottom text
    c.setFillColor(HexColor("#555555"))
    c.setFont("Helvetica", 9)
    c.drawCentredString(WIDTH/2, 60, "Curating executive experiences through world-class sport")
    c.showPage()


def draw_intro(c):
    c.setFillColor(LIGHT_BG)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1)
    y = HEIGHT - 120
    c.setFillColor(BLACK)
    c.setFont("Times-Italic", 32)
    c.drawCentredString(WIDTH/2, y, "Executive Experiences")
    y -= 20
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.line(WIDTH/2 - 40, y, WIDTH/2 + 40, y)
    y -= 40
    c.setFillColor(GRAY)
    c.setFont("Helvetica", 11)
    intro_lines = [
        "The Ortus Club brings C-suite leaders and senior decision-makers",
        "together through world-class sporting events. From executive suites",
        "at Formula 1 Grand Prix to hospitality boxes at premier football",
        "matches, we create unforgettable settings for meaningful connections.",
        "",
        "This catalogue presents our curated selection of sporting events",
        "for the 2026-2027 season. Each experience is designed to foster",
        "genuine relationships built on shared passions.",
    ]
    for line in intro_lines:
        c.drawCentredString(WIDTH/2, y, line)
        y -= 20

    y -= 40
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(WIDTH/2, y, "WHAT'S INCLUDED")
    y -= 30
    c.setFont("Helvetica", 10)
    c.setFillColor(GRAY)
    includes = [
        "Premium hospitality & executive seating",
        "Curated networking with C-suite peers",
        "Gourmet dining & fine beverages",
        "Dedicated Ortus Club event concierge",
        "Post-event networking reception",
    ]
    for item in includes:
        c.drawCentredString(WIDTH/2, y, f"•  {item}")
        y -= 22
    c.showPage()


def draw_event_page(c, evt, idx):
    # Alternating backgrounds
    if idx % 2 == 0:
        c.setFillColor(WHITE)
    else:
        c.setFillColor(LIGHT_BG)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1)

    margin = 60
    y = HEIGHT - 80

    # Sport label
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin, y, evt["sport"].upper())
    y -= 35

    # Event title
    c.setFillColor(BLACK)
    c.setFont("Times-Italic", 30)
    c.drawString(margin, y, evt["event"])
    y -= 18

    # Gold underline
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.line(margin, y, margin + 100, y)
    y -= 35

    # Date & location
    c.setFillColor(DARK_GREEN)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin, y, "DATE")
    c.setFont("Helvetica", 10)
    c.drawString(margin + 80, y, evt["date"])
    y -= 22
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin, y, "LOCATION")
    c.setFont("Helvetica", 10)
    c.drawString(margin + 80, y, evt["location"])
    y -= 45

    # Description
    c.setFillColor(GRAY)
    c.setFont("Helvetica", 11)
    words = evt["desc"].split()
    line = ""
    max_width = WIDTH - 2 * margin
    for word in words:
        test = f"{line} {word}".strip()
        if c.stringWidth(test, "Helvetica", 11) < max_width:
            line = test
        else:
            c.drawString(margin, y, line)
            y -= 18
            line = word
    if line:
        c.drawString(margin, y, line)
        y -= 18

    # Page number
    c.setFillColor(HexColor("#aaaaaa"))
    c.setFont("Helvetica", 9)
    c.drawCentredString(WIDTH/2, 40, f"— {idx + 3} —")

    c.showPage()


def draw_back_cover(c):
    c.setFillColor(DARK_GREEN)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1)
    y = HEIGHT/2 + 60
    c.setFillColor(WHITE)
    c.setFont("Times-Italic", 36)
    c.drawCentredString(WIDTH/2, y, "Ready to Experience it?")
    y -= 30
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.line(WIDTH/2 - 40, y, WIDTH/2 + 40, y)
    y -= 40
    c.setFillColor(HexColor("#cccccc"))
    c.setFont("Helvetica", 11)
    c.drawCentredString(WIDTH/2, y, "Contact us to attend or host an exclusive sporting event.")
    y -= 25
    c.drawCentredString(WIDTH/2, y, "sport@ortusclub.com  |  ortusclub.com/sport")
    y -= 60
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(WIDTH/2, y, "THE ORTUS CLUB")
    c.showPage()


def main():
    c = canvas.Canvas(OUTPUT, pagesize=A4)
    c.setTitle("The Ortus Club — Sporting Events Catalogue 2026-2027")
    c.setAuthor("The Ortus Club")
    draw_cover(c)
    draw_intro(c)
    for i, evt in enumerate(events):
        draw_event_page(c, evt, i)
    draw_back_cover(c)
    c.save()
    print(f"Created {OUTPUT} ({len(events) + 3} pages)")


if __name__ == "__main__":
    main()
