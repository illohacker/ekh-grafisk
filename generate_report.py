from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import mm, cm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable
)
from reportlab.platypus.doctemplate import PageTemplate, BaseDocTemplate, Frame
from reportlab.lib import colors
from datetime import datetime

PRIMARY = HexColor("#C2267A")
PRIMARY_DARK = HexColor("#9E1D63")
DARK = HexColor("#1a1a1a")
GRAY = HexColor("#6b7280")
LIGHT_GRAY = HexColor("#f3f4f6")
RED = HexColor("#dc2626")
ORANGE = HexColor("#ea580c")
YELLOW = HexColor("#ca8a04")
GREEN = HexColor("#16a34a")

styles = getSampleStyleSheet()

styles.add(ParagraphStyle(
    name="ReportTitle",
    fontName="Helvetica-Bold",
    fontSize=28,
    leading=34,
    textColor=DARK,
    spaceAfter=6,
))
styles.add(ParagraphStyle(
    name="ReportSubtitle",
    fontName="Helvetica",
    fontSize=14,
    leading=18,
    textColor=GRAY,
    spaceAfter=30,
))
styles.add(ParagraphStyle(
    name="SectionTitle",
    fontName="Helvetica-Bold",
    fontSize=18,
    leading=22,
    textColor=PRIMARY_DARK,
    spaceBefore=20,
    spaceAfter=10,
))
styles.add(ParagraphStyle(
    name="SubSection",
    fontName="Helvetica-Bold",
    fontSize=13,
    leading=16,
    textColor=DARK,
    spaceBefore=14,
    spaceAfter=6,
))
styles.add(ParagraphStyle(
    name="Body",
    fontName="Helvetica",
    fontSize=10,
    leading=14,
    textColor=DARK,
    alignment=TA_JUSTIFY,
    spaceAfter=6,
))
styles.add(ParagraphStyle(
    name="BodyBold",
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=14,
    textColor=DARK,
    spaceAfter=6,
))
styles.add(ParagraphStyle(
    name="BulletItem",
    fontName="Helvetica",
    fontSize=10,
    leading=14,
    textColor=DARK,
    leftIndent=20,
    spaceAfter=3,
    bulletIndent=10,
))
styles.add(ParagraphStyle(
    name="CriticalTag",
    fontName="Helvetica-Bold",
    fontSize=9,
    textColor=white,
    backColor=RED,
    spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="SmallGray",
    fontName="Helvetica",
    fontSize=8,
    leading=10,
    textColor=GRAY,
))
styles.add(ParagraphStyle(
    name="FooterStyle",
    fontName="Helvetica",
    fontSize=7,
    textColor=GRAY,
    alignment=TA_CENTER,
))


def severity_badge(level):
    color_map = {
        "CRITICA": RED,
        "ALTA": ORANGE,
        "MEDIA": YELLOW,
        "BAJA": GREEN,
    }
    bg = color_map.get(level, GRAY)
    return Paragraph(
        f'<font color="white"><b>&nbsp;{level}&nbsp;</b></font>',
        ParagraphStyle("badge", fontName="Helvetica-Bold", fontSize=9,
                       backColor=bg, textColor=white, alignment=TA_CENTER)
    )


def header_footer(canvas_obj, doc):
    canvas_obj.saveState()
    # Header line
    canvas_obj.setStrokeColor(PRIMARY)
    canvas_obj.setLineWidth(2)
    canvas_obj.line(20 * mm, A4[1] - 15 * mm, A4[0] - 20 * mm, A4[1] - 15 * mm)
    canvas_obj.setFont("Helvetica-Bold", 8)
    canvas_obj.setFillColor(PRIMARY)
    canvas_obj.drawString(20 * mm, A4[1] - 13 * mm, "EKH GRAFISK")
    canvas_obj.setFont("Helvetica", 8)
    canvas_obj.setFillColor(GRAY)
    canvas_obj.drawRightString(A4[0] - 20 * mm, A4[1] - 13 * mm, "INFORME DE SEGURIDAD - CONFIDENCIAL")
    # Footer
    canvas_obj.setFont("Helvetica", 7)
    canvas_obj.setFillColor(GRAY)
    canvas_obj.drawString(20 * mm, 12 * mm, "Confidencial - Solo para uso interno de EKH Grafisk AS")
    canvas_obj.drawRightString(A4[0] - 20 * mm, 12 * mm, f"Pagina {doc.page}")
    canvas_obj.restoreState()


def build_report():
    output_path = "EKH_Grafisk_Security_Audit_2026.pdf"
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        topMargin=22 * mm,
        bottomMargin=20 * mm,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
    )

    story = []

    # ── COVER PAGE ──
    story.append(Spacer(1, 60))

    # Logo area
    story.append(Paragraph("EKH GRAFISK", ParagraphStyle(
        "LogoText", fontName="Helvetica-Bold", fontSize=36, textColor=PRIMARY, spaceAfter=4
    )))
    story.append(HRFlowable(width="100%", thickness=3, color=PRIMARY, spaceAfter=20))

    story.append(Paragraph("Informe de Auditoria de Seguridad", styles["ReportTitle"]))
    story.append(Paragraph("Analisis de vulnerabilidades en ekh.no/send-filer y filer.ekh.no", styles["ReportSubtitle"]))

    story.append(Spacer(1, 30))

    # Meta info table
    meta_data = [
        ["Fecha del informe:", datetime.now().strftime("%d de abril de %Y")],
        ["Objetivo:", "https://www.ekh.no/send-filer"],
        ["Alcance:", "Formulario Filemail, servidor filer.ekh.no, CMS admin"],
        ["Clasificacion:", "CONFIDENCIAL"],
        ["Metodologia:", "Analisis no intrusivo (sin explotacion activa)"],
    ]
    meta_table = Table(meta_data, colWidths=[45 * mm, 120 * mm])
    meta_table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("TEXTCOLOR", (0, 0), (0, -1), DARK),
        ("TEXTCOLOR", (1, 0), (1, -1), GRAY),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(meta_table)

    story.append(Spacer(1, 40))

    # Summary box
    summary_data = [
        [Paragraph('<font color="white"><b>RESUMEN EJECUTIVO</b></font>', styles["BodyBold"]),
         "", "", ""],
        [severity_badge("CRITICA"), Paragraph("<b>2</b>", styles["Body"]),
         severity_badge("ALTA"), Paragraph("<b>2</b>", styles["Body"])],
        [severity_badge("MEDIA"), Paragraph("<b>2</b>", styles["Body"]),
         severity_badge("BAJA"), Paragraph("<b>1</b>", styles["Body"])],
    ]
    summary_table = Table(summary_data, colWidths=[30 * mm, 40 * mm, 30 * mm, 40 * mm])
    summary_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PRIMARY_DARK),
        ("SPAN", (0, 0), (-1, 0)),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BACKGROUND", (0, 1), (-1, -1), LIGHT_GRAY),
        ("BOX", (0, 0), (-1, -1), 1, PRIMARY_DARK),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (1, 1), (1, -1), "LEFT"),
        ("ALIGN", (3, 1), (3, -1), "LEFT"),
    ]))
    story.append(summary_table)

    story.append(PageBreak())

    # ── TABLE OF CONTENTS ──
    story.append(Paragraph("Indice", styles["SectionTitle"]))
    toc_items = [
        "1. Resumen ejecutivo",
        "2. Hallazgo CRITICO: Formulario Filemail sin proteccion",
        "3. Hallazgo CRITICO: Panel de administracion CMS expuesto",
        "4. Hallazgo ALTO: Datos personales de empleados expuestos",
        "5. Hallazgo ALTO: Iframe sin aislamiento de seguridad",
        "6. Hallazgo MEDIO: Directorios del servidor accesibles",
        "7. Hallazgo MEDIO: Cabeceras de seguridad ausentes",
        "8. CVEs conocidos de CMS Made Simple",
        "9. Busqueda de filtraciones de correos",
        "10. Recomendaciones prioritarias",
    ]
    for item in toc_items:
        story.append(Paragraph(item, styles["Body"]))
    story.append(Spacer(1, 10))

    story.append(PageBreak())

    # ── 1. EXECUTIVE SUMMARY ──
    story.append(Paragraph("1. Resumen Ejecutivo", styles["SectionTitle"]))
    story.append(Paragraph(
        "Se ha realizado un analisis de seguridad no intrusivo sobre la pagina "
        "<b>ekh.no/send-filer</b> y la infraestructura asociada (<b>filer.ekh.no</b>). "
        "El analisis ha revelado <b>2 vulnerabilidades criticas</b>, <b>2 altas</b> y "
        "<b>3 de severidad media/baja</b> que requieren atencion inmediata.",
        styles["Body"]
    ))
    story.append(Paragraph(
        "La combinacion de un formulario de envio de archivos sin proteccion, nombres de "
        "empleados expuestos publicamente, y un panel de administracion CMS obsoleto y accesible "
        "desde internet, crea un vector de ataque significativo que podria resultar en "
        "ejecucion remota de codigo, distribucion de malware dirigido al personal, o "
        "compromiso total del servidor de archivos.",
        styles["Body"]
    ))

    story.append(PageBreak())

    # ── 2. FILEMAIL ──
    story.append(Paragraph("2. Formulario Filemail sin Proteccion", styles["SectionTitle"]))

    vuln_header = [
        [Paragraph('<font color="white"><b>SEVERIDAD: CRITICA</b></font>', styles["Body"]),
         Paragraph('<font color="white"><b>CVSS estimado: 9.0+</b></font>', styles["Body"])]
    ]
    vt = Table(vuln_header, colWidths=[85 * mm, 85 * mm])
    vt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), RED),
        ("TEXTCOLOR", (0, 0), (-1, -1), white),
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(vt)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>URL afectada:</b> https://www.filemail.com/incoming/9574240876", styles["Body"]))
    story.append(Paragraph("<b>Embebido en:</b> https://www.ekh.no/send-filer (iframe)", styles["Body"]))
    story.append(Spacer(1, 6))

    story.append(Paragraph("<b>Descripcion:</b>", styles["BodyBold"]))
    story.append(Paragraph(
        "El formulario de subida de archivos utiliza un servicio externo (Filemail) embebido "
        "mediante un iframe. La URL del formulario es publica y accesible directamente sin "
        "autenticacion. El formulario carece de todas las protecciones basicas de seguridad:",
        styles["Body"]
    ))

    findings = [
        "Sin CAPTCHA de ningun tipo (ni reCAPTCHA, ni hCaptcha, ni Turnstile)",
        "Campo de email es tipo 'text' (no 'email'), sin validacion de formato",
        "Ningun campo es obligatorio (required=false en todos)",
        "Sin restriccion de tipo de archivo (no hay atributo 'accept')",
        "Sin limite de tamano de archivo declarado",
        "Sin rate limiting visible",
        "Email del remitente no se verifica (se puede suplantar cualquier identidad)",
    ]
    for f in findings:
        story.append(Paragraph(f"&bull; {f}", styles["BulletItem"]))

    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Escenario de ataque:</b>", styles["BodyBold"]))
    story.append(Paragraph(
        "Un atacante puede enviar archivos maliciosos (ransomware, troyanos) directamente a "
        "empleados especificos de EKH Grafisk. Al seleccionar un destinatario concreto de la lista "
        "(ej: 'Sondre Krohn'), el archivo llega como si fuera un envio legitimo de un cliente. "
        "El empleado lo abre porque el contexto (plataforma de la empresa, nombre de cliente "
        "falso) genera confianza.",
        styles["Body"]
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Remediacion:</b>", styles["BodyBold"]))
    remediation = [
        "Implementar CAPTCHA (reCAPTCHA v3 o hCaptcha) en el formulario",
        "Requerir verificacion de email antes de permitir el envio",
        "Restringir tipos de archivo permitidos (.pdf, .ai, .psd, .indd, .jpg, .png, .tiff)",
        "Establecer limite maximo de tamano de archivo",
        "Implementar rate limiting (max 5 envios por IP/hora)",
        "Reemplazar nombres de empleados por departamentos genericos",
    ]
    for r in remediation:
        story.append(Paragraph(f"&bull; {r}", styles["BulletItem"]))

    story.append(PageBreak())

    # ── 3. CMS ADMIN ──
    story.append(Paragraph("3. Panel de Administracion CMS Expuesto", styles["SectionTitle"]))

    vt2 = Table(
        [[Paragraph('<font color="white"><b>SEVERIDAD: CRITICA</b></font>', styles["Body"]),
          Paragraph('<font color="white"><b>CVSS estimado: 9.5+</b></font>', styles["Body"])]],
        colWidths=[85 * mm, 85 * mm]
    )
    vt2.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), RED),
        ("TEXTCOLOR", (0, 0), (-1, -1), white),
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(vt2)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>URL afectada:</b> https://filer.ekh.no/admin/login.php", styles["Body"]))
    story.append(Paragraph("<b>Software:</b> CMS Made Simple (copyright 2004-2014)", styles["Body"]))
    story.append(Paragraph("<b>jQuery:</b> 1.11.1 (2014) - 12 anos desactualizado", styles["Body"]))
    story.append(Paragraph("<b>Servidor:</b> Apache (version no oculta)", styles["Body"]))
    story.append(Spacer(1, 6))

    story.append(Paragraph("<b>Descripcion:</b>", styles["BodyBold"]))
    story.append(Paragraph(
        "El servidor de archivos filer.ekh.no ejecuta una instalacion de CMS Made Simple con "
        "un panel de administracion accesible publicamente desde internet. La version del CMS "
        "es antigua y tiene multiples vulnerabilidades criticas conocidas (CVEs) que permiten "
        "desde inyeccion SQL hasta ejecucion remota de codigo.",
        styles["Body"]
    ))

    cms_findings = [
        "Panel de login accesible sin restriccion de IP",
        "Sin CAPTCHA ni proteccion contra fuerza bruta visible",
        "Funcionalidad 'Forgot password' expuesta (permite enumerar usuarios)",
        "Directorios /tmp/cache/ y /tmp/templates_c/ accesibles (HTTP 200)",
        "Servidor revela 'Apache' sin ocultar la version",
        "Meta tag generator revela el CMS y version exacta",
        "Enlace HTTP inseguro en el propio panel (http://html5shiv.googlecode.com)",
    ]
    for f in cms_findings:
        story.append(Paragraph(f"&bull; {f}", styles["BulletItem"]))

    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Remediacion:</b>", styles["BodyBold"]))
    cms_remediation = [
        "URGENTE: Restringir acceso a /admin/ por IP (whitelist) o VPN",
        "Actualizar CMS Made Simple a la ultima version estable",
        "Actualizar jQuery a version 3.x+",
        "Implementar fail2ban o similar contra fuerza bruta",
        "Bloquear acceso a /tmp/, /lib/, y directorios internos",
        "Eliminar meta tag 'generator' que revela el CMS",
        "Ocultar version de Apache en las cabeceras",
        "Implementar cabeceras de seguridad (CSP, X-Content-Type-Options)",
    ]
    for r in cms_remediation:
        story.append(Paragraph(f"&bull; {r}", styles["BulletItem"]))

    story.append(PageBreak())

    # ── 4. EMPLOYEE DATA ──
    story.append(Paragraph("4. Datos Personales de Empleados Expuestos", styles["SectionTitle"]))

    vt3 = Table(
        [[Paragraph('<font color="white"><b>SEVERIDAD: ALTA</b></font>', styles["Body"]),
          Paragraph('<font color="white"><b>Riesgo: Ingenieria social</b></font>', styles["Body"])]],
        colWidths=[85 * mm, 85 * mm]
    )
    vt3.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), ORANGE),
        ("TEXTCOLOR", (0, 0), (-1, -1), white),
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(vt3)
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "El formulario de Filemail expone los nombres completos de 13 empleados como opciones "
        "de destinatario. Esta informacion es accesible para cualquier persona que visite la pagina "
        "o acceda directamente a la URL del formulario.",
        styles["Body"]
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Empleados expuestos:</b>", styles["BodyBold"]))

    emp_names = [
        "Andreas Dahle", "Arnt Jonny Varhaugvik", "Berit Breistrand",
        "Christina S. Nygard", "Eva-Britt Hoem", "Irene H. Skaldebo",
        "Irina Voscoboinic", "Kristine Meek Strand", "Malin Malmedal",
        "Paul Johan Undheim", "Rolf Inge Bjerkeset", "Sondre Krohn",
    ]
    for name in emp_names:
        story.append(Paragraph(f"&bull; {name}", styles["BulletItem"]))

    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Adicionalmente, la pagina de contacto (ekh.no/kontakt) expone numeros de "
        "telefono movil personales y direcciones de email individuales de 16 empleados.",
        styles["Body"]
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Correos electronicos expuestos en ekh.no/kontakt:</b>", styles["BodyBold"]))
    emails = [
        "kjetil@ekh.no (CEO)", "sveinung@ekh.no", "beritb@ekh.no",
        "arntjv@ekh.no", "irene@ekh.no", "sondre@ekh.no",
        "irina@ekh.no", "christina@ekh.no", "evabritt@ekh.no",
        "rolf@ekh.no", "pju@ekh.no", "andreas@ekh.no",
        "john@ekh.no", "maxim@ekh.no", "mette@frena-trykk.no",
    ]
    for email in emails:
        story.append(Paragraph(f"&bull; {email}", styles["BulletItem"]))

    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Remediacion:</b>", styles["BodyBold"]))
    story.append(Paragraph("&bull; Reemplazar nombres individuales en Filemail por departamentos (ej: 'Prepress', 'Design', 'Salg')", styles["BulletItem"]))
    story.append(Paragraph("&bull; Considerar usar un formulario de contacto generico en lugar de mostrar emails directos", styles["BulletItem"]))
    story.append(Paragraph("&bull; Usar formatos como 'nombre (arroba) ekh.no' o formularios de contacto", styles["BulletItem"]))

    story.append(PageBreak())

    # ── 5. IFRAME ──
    story.append(Paragraph("5. Iframe sin Aislamiento de Seguridad", styles["SectionTitle"]))

    vt4 = Table(
        [[Paragraph('<font color="white"><b>SEVERIDAD: ALTA</b></font>', styles["Body"]),
          Paragraph('<font color="white"><b>Riesgo: XSS / Hijacking</b></font>', styles["Body"])]],
        colWidths=[85 * mm, 85 * mm]
    )
    vt4.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), ORANGE),
        ("TEXTCOLOR", (0, 0), (-1, -1), white),
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(vt4)
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "El iframe que embebe el formulario de Filemail en ekh.no/send-filer carece de "
        "atributos de seguridad (sandbox, allow, referrerpolicy). Esto otorga al contenido "
        "del iframe acceso completo al contexto del navegador.",
        styles["Body"]
    ))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Codigo actual:</b>", styles["BodyBold"]))
    story.append(Paragraph(
        '<font face="Courier" size="9">&lt;iframe src="https://www.filemail.com/incoming/9574240876?integrated" '
        'width="100%"&gt;</font>',
        styles["Body"]
    ))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Codigo recomendado:</b>", styles["BodyBold"]))
    story.append(Paragraph(
        '<font face="Courier" size="9">&lt;iframe src="..." sandbox="allow-scripts allow-forms '
        'allow-same-origin" referrerpolicy="no-referrer"&gt;</font>',
        styles["Body"]
    ))

    story.append(PageBreak())

    # ── 6 & 7. MEDIUM ──
    story.append(Paragraph("6. Directorios del Servidor Accesibles", styles["SectionTitle"]))
    vt5 = Table(
        [[Paragraph('<font color="white"><b>SEVERIDAD: MEDIA</b></font>', styles["Body"])]],
        colWidths=[170 * mm]
    )
    vt5.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), YELLOW),
        ("TEXTCOLOR", (0, 0), (-1, -1), white),
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(vt5)
    story.append(Spacer(1, 8))

    dir_table_data = [
        [Paragraph("<b>Ruta</b>", styles["Body"]), Paragraph("<b>Estado HTTP</b>", styles["Body"]), Paragraph("<b>Riesgo</b>", styles["Body"])],
        ["/admin/", "302 -> login.php", "Panel admin expuesto"],
        ["/tmp/cache/", "200 OK", "Cache interna accesible"],
        ["/tmp/templates_c/", "200 OK", "Templates compilados accesibles"],
        ["/uploads/EKH/*.zip", "200 OK", "Archivos descargables sin auth"],
    ]
    dt = Table(dir_table_data, colWidths=[55 * mm, 45 * mm, 70 * mm])
    dt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PRIMARY_DARK),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("BACKGROUND", (0, 1), (-1, -1), LIGHT_GRAY),
        ("GRID", (0, 0), (-1, -1), 0.5, GRAY),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(dt)

    story.append(Spacer(1, 14))
    story.append(Paragraph("7. Cabeceras de Seguridad Ausentes", styles["SectionTitle"]))

    vt6 = Table(
        [[Paragraph('<font color="white"><b>SEVERIDAD: MEDIA</b></font>', styles["Body"])]],
        colWidths=[170 * mm]
    )
    vt6.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), YELLOW),
        ("TEXTCOLOR", (0, 0), (-1, -1), white),
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(vt6)
    story.append(Spacer(1, 8))

    headers_data = [
        [Paragraph("<b>Cabecera</b>", styles["Body"]), Paragraph("<b>ekh.no</b>", styles["Body"]), Paragraph("<b>filer.ekh.no</b>", styles["Body"])],
        ["Content-Security-Policy", "frame-ancestors 'self'", "NO CONFIGURADA"],
        ["X-Frame-Options", "SAMEORIGIN", "SAMEORIGIN"],
        ["Strict-Transport-Security", "max-age=31536000", "NO CONFIGURADA"],
        ["X-Content-Type-Options", "No detectada", "NO CONFIGURADA"],
        ["Referrer-Policy", "No detectada", "NO CONFIGURADA"],
    ]
    ht = Table(headers_data, colWidths=[55 * mm, 55 * mm, 60 * mm])
    ht.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PRIMARY_DARK),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("BACKGROUND", (0, 1), (-1, -1), LIGHT_GRAY),
        ("GRID", (0, 0), (-1, -1), 0.5, GRAY),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(ht)

    story.append(Paragraph(
        "El sitio principal (ekh.no) esta detras de Cloudflare y tiene algunas cabeceras basicas. "
        "Sin embargo, filer.ekh.no corre en Apache sin ninguna cabecera de seguridad configurada.",
        styles["Body"]
    ))

    story.append(PageBreak())

    # ── 8. CVEs ──
    story.append(Paragraph("8. CVEs Conocidos de CMS Made Simple", styles["SectionTitle"]))
    story.append(Paragraph(
        "CMS Made Simple tiene un historial extenso de vulnerabilidades criticas. Las siguientes "
        "afectan a versiones recientes y son potencialmente aplicables al servidor filer.ekh.no:",
        styles["Body"]
    ))

    cve_data = [
        [Paragraph("<b>CVE</b>", styles["Body"]),
         Paragraph("<b>CVSS</b>", styles["Body"]),
         Paragraph("<b>Tipo</b>", styles["Body"]),
         Paragraph("<b>Descripcion</b>", styles["Body"])],
        ["CVE-2024-1527", "8.8", "File Upload / RCE",
         Paragraph("Subida de archivo sin restricciones permite crear webshells y ejecutar codigo remoto", styles["SmallGray"])],
        ["CVE-2023-36969", "8.8", "RCE",
         Paragraph("Ejecucion remota de codigo a traves de la funcionalidad de subida de archivos (v2.2.17)", styles["SmallGray"])],
        ["CVE-2021-28999", "8.8", "SQL Injection / RCE",
         Paragraph("Inyeccion SQL en modulo News via parametro m1_sortby permite ejecucion remota", styles["SmallGray"])],
        ["CVE-2021-40961", "8.8", "SQL Injection",
         Paragraph("Inyeccion SQL en modules/News/function.admin_articlestab.php", styles["SmallGray"])],
        ["CVE-2022-23906", "7.2", "RCE",
         Paragraph("Ejecucion remota via funcion de avatar con archivos de imagen manipulados", styles["SmallGray"])],
        ["CVE-2021-28998", "7.2", "File Upload / RCE",
         Paragraph("Subida de archivos .phar permite obtener webshell a atacante autenticado", styles["SmallGray"])],
        ["CVE-2020-10682", "7.8", "RCE",
         Paragraph("File Manager permite RCE mediante archivos .php.jpegd enviados como octet-stream", styles["SmallGray"])],
        ["CVE-2026-5203", "4.7", "Path Traversal",
         Paragraph("Traversal de directorios en importacion XML de UserGuide", styles["SmallGray"])],
    ]
    ct = Table(cve_data, colWidths=[32 * mm, 15 * mm, 35 * mm, 88 * mm])
    ct.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PRIMARY_DARK),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
        ("BACKGROUND", (0, 1), (-1, -1), LIGHT_GRAY),
        ("GRID", (0, 0), (-1, -1), 0.5, GRAY),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(ct)

    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "<b>Nota:</b> Varias de estas vulnerabilidades (CVE-2024-1527, CVE-2023-36969) permiten "
        "a un atacante autenticado ejecutar codigo arbitrario en el servidor. Si se combinan con "
        "un ataque de fuerza bruta al panel de login expuesto (sin proteccion), el riesgo de "
        "compromiso total del servidor es muy elevado.",
        styles["Body"]
    ))

    story.append(PageBreak())

    # ── 9. EMAIL LEAKS ──
    story.append(Paragraph("9. Busqueda de Filtraciones de Correos", styles["SectionTitle"]))
    story.append(Paragraph(
        "Se ha realizado una busqueda en fuentes publicas (motores de busqueda, bases de datos de "
        "brechas publicas) para determinar si los correos del dominio @ekh.no aparecen en "
        "filtraciones de datos conocidas.",
        styles["Body"]
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Correos analizados (15):</b>", styles["BodyBold"]))

    email_list = [
        ["kjetil@ekh.no", "CEO", "Sin resultados en fuentes publicas"],
        ["sveinung@ekh.no", "Finanzas/Admin", "Sin resultados en fuentes publicas"],
        ["beritb@ekh.no", "Marketing", "Sin resultados en fuentes publicas"],
        ["arntjv@ekh.no", "Ventas", "Sin resultados en fuentes publicas"],
        ["irene@ekh.no", "Disenadora", "Sin resultados en fuentes publicas"],
        ["sondre@ekh.no", "Disenador", "Sin resultados en fuentes publicas"],
        ["irina@ekh.no", "Web/UX", "Sin resultados en fuentes publicas"],
        ["christina@ekh.no", "Disenadora", "Sin resultados en fuentes publicas"],
        ["evabritt@ekh.no", "Disenadora", "Sin resultados en fuentes publicas"],
        ["rolf@ekh.no", "Reprografia", "Sin resultados en fuentes publicas"],
        ["pju@ekh.no", "Skilt/Cultural", "Sin resultados en fuentes publicas"],
        ["andreas@ekh.no", "Web Developer", "Sin resultados en fuentes publicas"],
        ["john@ekh.no", "IT/Instalacion", "Sin resultados en fuentes publicas"],
        ["maxim@ekh.no", "Produccion", "Sin resultados en fuentes publicas"],
        ["mette@frena-trykk.no", "Disenadora", "Sin resultados en fuentes publicas"],
    ]

    email_table_data = [
        [Paragraph("<b>Email</b>", styles["Body"]),
         Paragraph("<b>Rol</b>", styles["Body"]),
         Paragraph("<b>Resultado</b>", styles["Body"])]
    ] + email_list

    et = Table(email_table_data, colWidths=[55 * mm, 40 * mm, 75 * mm])
    et.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PRIMARY_DARK),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
        ("BACKGROUND", (0, 1), (-1, -1), LIGHT_GRAY),
        ("GRID", (0, 0), (-1, -1), 0.5, GRAY),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(et)

    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "<b>Resultado:</b> No se han encontrado los correos @ekh.no en filtraciones de datos "
        "publicas indexadas por motores de busqueda. Sin embargo, se recomienda verificar cada "
        "correo individualmente en Have I Been Pwned (haveibeenpwned.com) con una cuenta de "
        "dominio para obtener resultados completos, ya que las busquedas por dominio requieren "
        "verificacion de propiedad.",
        styles["Body"]
    ))
    story.append(Paragraph(
        "<b>Riesgo latente:</b> Aunque no se detectaron filtraciones, la exposicion publica de "
        "todos estos correos en la web (ekh.no/kontakt) facilita su inclusion en listas de "
        "spam, phishing dirigido y ataques de credential stuffing.",
        styles["Body"]
    ))

    story.append(PageBreak())

    # ── 10. RECOMMENDATIONS ──
    story.append(Paragraph("10. Recomendaciones Prioritarias", styles["SectionTitle"]))

    story.append(Paragraph("<b>INMEDIATO (esta semana):</b>", styles["BodyBold"]))
    imm = [
        "Restringir acceso a filer.ekh.no/admin/ por IP (solo oficinas de Molde y Hustadvika)",
        "Anadir CAPTCHA al formulario de Filemail o reemplazar por solucion propia",
        "Reemplazar nombres de empleados en Filemail por departamentos",
        "Bloquear acceso a /tmp/cache/ y /tmp/templates_c/",
    ]
    for i, r in enumerate(imm, 1):
        story.append(Paragraph(f"<b>{i}.</b> {r}", styles["BulletItem"]))

    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>CORTO PLAZO (este mes):</b>", styles["BodyBold"]))
    short = [
        "Actualizar CMS Made Simple a la ultima version",
        "Actualizar jQuery y todas las dependencias del servidor",
        "Configurar cabeceras de seguridad en Apache (CSP, HSTS, X-Content-Type-Options)",
        "Implementar fail2ban contra ataques de fuerza bruta en el login",
        "Anadir atributo sandbox al iframe de Filemail en ekh.no",
    ]
    for i, r in enumerate(short, 1):
        story.append(Paragraph(f"<b>{i}.</b> {r}", styles["BulletItem"]))

    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>MEDIO PLAZO (proximo trimestre):</b>", styles["BodyBold"]))
    medium = [
        "Evaluar migracion del CMS a una plataforma moderna y mantenida",
        "Verificar todos los correos @ekh.no en Have I Been Pwned (cuenta de dominio)",
        "Implementar politica de contrasenas robustas y 2FA para todos los accesos admin",
        "Realizar una auditoria de seguridad completa del servidor Apache",
        "Considerar mover filer.ekh.no detras de Cloudflare como el sitio principal",
    ]
    for i, r in enumerate(medium, 1):
        story.append(Paragraph(f"<b>{i}.</b> {r}", styles["BulletItem"]))

    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=10))
    story.append(Paragraph(
        "Este informe ha sido elaborado mediante analisis no intrusivo. No se han "
        "explotado vulnerabilidades ni se ha accedido a datos protegidos. Toda la informacion "
        "ha sido obtenida de fuentes publicamente accesibles.",
        styles["SmallGray"]
    ))
    story.append(Paragraph(
        f"Generado el {datetime.now().strftime('%d/%m/%Y a las %H:%M')}.",
        styles["SmallGray"]
    ))

    # Build
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(f"PDF generado: {output_path}")


if __name__ == "__main__":
    build_report()
