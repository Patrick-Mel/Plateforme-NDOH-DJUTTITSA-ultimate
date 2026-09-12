import os

os.makedirs('public/documents', exist_ok=True)

def create_simple_pdf(filename, title, content_lines):
    # Generates a valid minimal PDF 1.4 file
    stream_content = f"BT /F1 16 Tf 50 750 Td ({title}) Tj ET\n"
    y = 710
    for line in content_lines:
        # Escape parenthesis in PDF strings
        safe_line = line.replace('(', '\\(').replace(')', '\\)')
        stream_content += f"BT /F1 11 Tf 50 {y} Td ({safe_line}) Tj ET\n"
        y -= 20

    stream_bytes = stream_content.encode('latin-1', errors='replace')
    stream_len = len(stream_bytes)

    objects = []
    # Obj 1: Catalog
    objects.append(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
    # Obj 2: Pages
    objects.append(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")
    # Obj 3: Page
    objects.append(b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n")
    # Obj 4: Content Stream
    objects.append(f"4 0 obj\n<< /Length {stream_len} >>\nstream\n".encode('ascii') + stream_bytes + b"\nendstream\nendobj\n")
    # Obj 5: Font
    objects.append(b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")

    pdf_body = b"%PDF-1.4\n"
    offsets = [0]
    curr_pos = len(pdf_body)

    for obj in objects:
        offsets.append(curr_pos)
        pdf_body += obj
        curr_pos = len(pdf_body)

    xref_offset = curr_pos
    xref = b"xref\n0 6\n0000000000 65535 f \n"
    for off in offsets[1:]:
        xref += f"{off:010d} 00000 n \n".encode('ascii')

    trailer = f"trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode('ascii')

    final_pdf = pdf_body + xref + trailer
    with open(f"public/documents/{filename}", "wb") as f:
        f.write(final_pdf)
    print(f"Created PDF: public/documents/{filename} ({len(final_pdf)} bytes)")

# Document 1: Presentation Historique
doc1_title = "CHEFFERIE DE NDOH-DJUTTITSA - PRESENTATION HISTORIQUE"
doc1_lines = [
    "Republique du Cameroun - Region de l Ouest - Departement de la Menoua",
    "Arrondissement de Nkong-Ni - Groupement Bafou",
    "",
    "1. FONDATION ET ORIGINES (1908)",
    "La chefferie de Ndoh-Djuttitsa a ete fondee en 1908 par les lignees pionnieres Bamileke",
    "attirees par la fertilite des hauts-plateaux et le climat frais d altitude.",
    "",
    "2. RECONNAISSANCE ADMINISTRATIVE ET DYNASTIE (1950)",
    "Erigee officiellement en chefferie traditionnelle de 3eme degre en 1950,",
    "elle est actuellement dirigee par Sa Majeste Jean-Paul Melaga Djuttitsa Fodoh Touni III.",
    "",
    "3. LE COMPLEXE THEIER DE DJUTTITSA (CTE)",
    "Implanted au milieu du XXe siecle, le domaine théier de Djuttitsa couvre plus de 1 600 hectares",
    "et constitue l un des bassins de production de thé de montagne majeurs d Afrique Centrale.",
    "",
    "Secrétariat Administratif et Coutumier de la Chefferie de Ndoh-Djuttitsa"
]

create_simple_pdf("presentation-historique-ndoh-djuttitsa.pdf", doc1_title, doc1_lines)

# Document 2: Guide d'Accueil
doc2_title = "NDOH-DJUTTITSA - GUIDE D ACCUEIL ET DE VISITE"
doc2_lines = [
    "Guide d Information Pratique pour les Visiteurs, Touristes et Chercheurs",
    "",
    "1. ACCES ET LOCALISATION",
    "Altitude : 1 700 m - 2 050 m. Acces depuis Dschang (23 km) ou Bafoussam via Nkong-Ni.",
    "Routes practicables en tout vehicule de tourisme ou 4x4.",
    "",
    "2. ACCUEIL ET REGLES COUTUMIERES",
    "Visite de courtoisie recommandee a la Chefferie traditionnelle de Ndoh-Djuttitsa.",
    "Respect des sanctuaires et lieux sacres du village.",
    "",
    "3. SANTE ET INFRASTRUCTURES",
    "Centre Medical d Arrondissement (CMA) de Ndoh-Djuttitsa : Permanence d urgence 24h/7.",
    "Contact urgences CMA : +237 690 12 34 56",
    "",
    "Comite de Developpement et Secrétariat Communautaire de Ndoh-Djuttitsa"
]

create_simple_pdf("guide-accueil-ndoh-djuttitsa.pdf", doc2_title, doc2_lines)
