"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";
import type { ChartConfiguration } from "chart.js";

type Scenario = "actual" | "optimizado";

type Subsection = {
  id: string;
  title: string;
  text: string;
};

type Section = {
  id: string;
  number: string;
  title: string;
  intro?: string;
  subsections: Subsection[];
};

const sections: Section[] = [
  {
    id: "sec-1",
    number: "1",
    title: "INTRODUCCIÓN",
    intro:
      "Esta sección presenta el contexto general del estudio, por qué el transporte es tan importante en minería y cuál es el alcance del análisis.",
    subsections: [
      {
        id: "s-1-1",
        title: "1.1 Contexto del sector minero-exportador",
        text:
          "El sector minero-exportador es una parte importante de economías como Bolivia. En el caso del antimonio, la competitividad no depende solo de tener mineral, sino también de la eficiencia para moverlo hacia mercados internacionales.",
      },
      {
        id: "s-1-2",
        title: "1.2 Importancia del transporte en la cadena de valor minera",
        text:
          "El transporte conecta la mina con el cliente final. En minería, mover el producto de forma eficiente puede cambiar por completo los márgenes del negocio porque afecta costo, tiempo, riesgo y cumplimiento.",
      },
      {
        id: "s-1-3",
        title: "1.3 Problemática actual en la logística de exportación",
        text:
          "La operación logística enfrenta fragmentación, dependencia de pocos actores, rutas sensibles a eventos externos y poca integración entre etapas. Eso genera tiempos largos, sobrecostos y menor competitividad.",
      },
      {
        id: "s-1-4",
        title: "1.4 Objetivo general del estudio",
        text:
          "Analizar la cadena logística de exportación de minerales, con énfasis en transporte, para encontrar ineficiencias y proponer mejoras de costo, tiempo y competitividad.",
      },
      {
        id: "s-1-5",
        title: "1.5 Objetivos específicos",
        text:
          "Entender el contexto sectorial, evaluar el rol del transporte, identificar limitaciones, analizar el flujo actual y proponer estrategias concretas de optimización.",
      },
      {
        id: "s-1-6",
        title: "1.6 Alcance y limitaciones",
        text:
          "El estudio se enfoca en la exportación de antimonio en el caso HOYO19. Las limitaciones principales son la variabilidad del volumen, la dependencia de proveedores y la información parcial en algunas etapas.",
      },
      {
        id: "s-1-7",
        title: "1.7 Metodología de análisis",
        text:
          "Se combina información técnica del sector con datos operativos del caso HOYO19. El análisis identifica cuellos de botella, evalúa impactos y diseña propuestas de mejora.",
      },
    ],
  },
  {
    id: "sec-2",
    number: "2",
    title: "MARCO CONCEPTUAL Y LOGÍSTICO",
    intro:
      "Aquí se explica cómo funciona la cadena de suministro minera y qué conceptos son clave para entender el problema.",
    subsections: [
      {
        id: "s-2-1",
        title: "2.1 Cadena de suministro en la minería",
        text:
          "La cadena minera va desde la extracción hasta la entrega al cliente. Incluye acopio, concentración o procesamiento, transporte interno, exportación y distribución internacional.",
      },
      {
        id: "s-2-2",
        title: "2.2 Conceptos clave de logística y transporte",
        text:
          "Logística significa planificar y controlar el flujo del producto. El costo logístico incluye transporte, almacenamiento, seguros, aduanas y coordinación operativa.",
      },
      {
        id: "s-2-3",
        title: "2.3 Tipos de transporte en exportación minera",
        text:
          "En este caso dominan el transporte terrestre por camión y el transporte marítimo. El sistema funciona como una cadena multimodal donde cada tramo depende del otro.",
      },
      {
        id: "s-2-4",
        title: "2.4 Incoterms aplicados a minerales",
        text:
          "Los Incoterms definen responsabilidades entre vendedor y comprador. En minería afectan costos, control logístico y transferencia de riesgo durante la exportación.",
      },
      {
        id: "s-2-5",
        title: "2.5 Costos logísticos y su impacto en la rentabilidad",
        text:
          "Los costos logísticos pueden comerse una parte importante del margen. Cuando el sistema no está optimizado, el transporte se vuelve el mayor peso económico de la operación.",
      },
    ],
  },
  {
    id: "sec-3",
    number: "3",
    title: "DIAGNÓSTICO DEL SISTEMA ACTUAL",
    intro:
      "Esta parte muestra cómo opera hoy HOYO19 y dónde están los principales problemas.",
    subsections: [
      {
        id: "s-3-1",
        title: "3.1 Descripción del flujo logístico actual",
        text:
          "El flujo parte en la extracción, pasa por acopio en Chilcobija, concentración en Sayari, transporte terrestre hacia Arica y luego transporte marítimo a Estados Unidos. Es una cadena funcional, pero dependiente de varias etapas sensibles.",
      },
      {
        id: "s-3-2",
        title: "3.2 Rutas de transporte utilizadas",
        text:
          "La ruta principal es Potosí → Cochabamba → Arica. El tramo Potosí → Cochabamba es de unos 407 km y Cochabamba → Arica de unos 760 a 800 km.",
      },
      {
        id: "s-3-3",
        title: "3.3 Infraestructura disponible",
        text:
          "La infraestructura vial es variable. Las carreteras pueden verse afectadas por lluvias, mantenimiento deficiente o conflictos sociales. Eso añade incertidumbre y demoras.",
      },
      {
        id: "s-3-4",
        title: "3.4 Actores involucrados",
        text:
          "Participan proveedores de mineral, centros de acopio y procesamiento, transportistas terrestres, agentes de carga, agentes aduaneros, intermediarios y clientes finales.",
      },
      {
        id: "s-3-5",
        title: "3.5 Tiempos de transporte",
        text:
          "El tiempo total de la cadena ronda 75 días. Una parte importante del retraso se concentra en el acopio y en la coordinación entre etapas.",
      },
      {
        id: "s-3-6",
        title: "3.6 Costos actuales",
        text:
          "Los costos más relevantes reportados son aproximadamente 32 USD/t en mina → planta, 2,643 USD por contenedor en planta → puerto y 6,274 USD en transporte marítimo internacional.",
      },
      {
        id: "s-3-7",
        title: "3.7 Cuellos de botella",
        text:
          "El principal cuello de botella está en el acopio, por la dependencia de proveedores y por la consolidación de carga en pocos nodos.",
      },
      {
        id: "s-3-8",
        title: "3.8 Ineficiencias del sistema",
        text:
          "Hay dependencia de pocos proveedores, rutas poco diversificadas, pocos agentes logísticos, costos altos y baja adopción tecnológica.",
      },
    ],
  },
  {
    id: "sec-4",
    number: "4",
    title: "ANÁLISIS DE TRANSPORTE",
    intro:
      "Esta sección separa el sistema en tramos para ver dónde pesa más el costo y el riesgo.",
    subsections: [
      {
        id: "s-4-1",
        title: "4.1 Transporte mina → planta",
        text:
          "Es un tramo relevante porque mueve material con menor valor relativo. Aunque el costo por tonelada es menor que otros tramos, tiene fuerte impacto en la eficiencia total.",
      },
      {
        id: "s-4-2",
        title: "4.2 Transporte planta → exportación",
        text:
          "El tramo terrestre hacia Arica es uno de los más críticos. Tiene costos altos por contenedor y está expuesto a condiciones geográficas y operativas complejas.",
      },
      {
        id: "s-4-3",
        title: "4.3 Logística en frontera",
        text:
          "El cruce fronterizo agrega riesgo operativo. Aunque no siempre genera grandes problemas, es un punto sensible donde cualquier demora afecta toda la cadena.",
      },
      {
        id: "s-4-4",
        title: "4.4 Transporte internacional",
        text:
          "El tramo marítimo es el componente más caro del sistema. Está sujeto a tarifas internacionales, disponibilidad de espacio y condiciones del mercado naviero.",
      },
      {
        id: "s-4-5",
        title: "4.5 Comparación entre rutas",
        text:
          "La operación actual depende demasiado de una sola ruta. Tener alternativas mejora resiliencia y permite negociar mejor.",
      },
      {
        id: "s-4-6",
        title: "4.6 Evaluación de riesgos",
        text:
          "Los riesgos se agrupan en operativos, logísticos, económicos y externos. Todos afectan tiempo, costo y confiabilidad.",
      },
    ],
  },
  {
    id: "sec-5",
    number: "5",
    title: "COSTOS LOGÍSTICOS Y ANÁLISIS ECONÓMICO",
    intro:
      "Aquí se muestra cómo se acumulan los costos y por qué la logística tiene tanto peso en el precio final.",
    subsections: [
      {
        id: "s-5-1",
        title: "5.1 Estructura de costos",
        text:
          "La estructura incluye transporte interno, transporte terrestre al puerto, transporte marítimo, seguros, regalías y gestión logística.",
      },
      {
        id: "s-5-2",
        title: "5.2 Costos por tipo de transporte",
        text:
          "El transporte interno es menor, el terrestre hacia el puerto pesa más y el marítimo es el componente más alto del sistema.",
      },
      {
        id: "s-5-3",
        title: "5.3 Costos por ruta",
        text:
          "En la ruta Potosí → Cochabamba → Arica → Estados Unidos, el costo logístico total estimado es de alrededor de 587 USD por tonelada.",
      },
      {
        id: "s-5-4",
        title: "5.4 Impacto en precio final",
        text:
          "Cuando el precio internacional fluctúa y el costo logístico se mantiene alto, la rentabilidad se vuelve muy sensible. Eso hace urgente controlar mejor la logística.",
      },
      {
        id: "s-5-5",
        title: "5.5 Análisis de eficiencia",
        text:
          "Las mayores ineficiencias están en tiempos muertos, baja concentración inicial, consolidación lenta y poca coordinación entre actores.",
      },
      {
        id: "s-5-6",
        title: "5.6 Sensibilidad",
        text:
          "El sistema es sensible a cambios en tarifas de transporte, retrasos, volumen y dependencia de pocos actores. Pequeñas variaciones generan impactos grandes.",
      },
    ],
  },
  {
    id: "sec-6",
    number: "6",
    title: "PROBLEMÁTICA",
    intro:
      "Esta sección resume los problemas estructurales del sistema actual.",
    subsections: [
      {
        id: "s-6-1",
        title: "6.1 Infraestructura",
        text:
          "La red vial tiene limitaciones por geografía, mantenimiento y clima. Eso sube costos y baja velocidad operativa.",
      },
      {
        id: "s-6-2",
        title: "6.2 Accesibilidad",
        text:
          "El acceso a rutas principales depende de trayectos secundarios que no siempre son confiables. Eso limita flexibilidad y respuesta.",
      },
      {
        id: "s-6-3",
        title: "6.3 Aduanas",
        text:
          "Aunque el marco regulatorio no es el mayor problema, las aduanas siguen siendo un punto donde cualquier pequeña ineficiencia puede acumular retrasos.",
      },
      {
        id: "s-6-4",
        title: "6.4 Costos",
        text:
          "El costo logístico es alto y difícil de controlar porque depende de muchos terceros y de una estructura fragmentada.",
      },
      {
        id: "s-6-5",
        title: "6.5 Intermediarios",
        text:
          "Hay demasiados actores en la cadena. Eso puede agregar comisiones, complejidad y menos visibilidad operativa.",
      },
      {
        id: "s-6-6",
        title: "6.6 Riesgos",
        text:
          "El sistema está expuesto a riesgos operativos, logísticos, externos y económicos que reducen estabilidad y previsibilidad.",
      },
      {
        id: "s-6-7",
        title: "6.7 Falta de optimización",
        text:
          "El problema principal es que el sistema funciona, pero no está diseñado como un todo integrado. Le falta una lógica de optimización real.",
      },
    ],
  },
  {
    id: "sec-7",
    number: "7",
    title: "DISEÑO DEL SERVICIO (HOYO19 CORE)",
    intro:
      "Aquí aparece la solución como servicio estructurado, no solo como idea.",
    subsections: [
      {
        id: "s-7-1",
        title: "7.1 Objetivo del servicio",
        text:
          "HOYO19 CORE busca reducir costos logísticos, mejorar tiempos y aumentar competitividad mediante análisis, rediseño e integración de la cadena.",
      },
      {
        id: "s-7-2",
        title: "7.2 Alcance",
        text:
          "Cubre desde el origen del mineral hasta la entrega internacional. Incluye etapa upstream, etapa intermedia y exportación.",
      },
      {
        id: "s-7-3",
        title: "7.3 Cliente objetivo",
        text:
          "Está pensado para empresas mineras pequeñas y medianas, exportadores e intermediarios que operan con logística poco optimizada.",
      },
      {
        id: "s-7-4",
        title: "7.4 Metodología",
        text:
          "La metodología incluye diagnóstico, modelación logística, identificación de oportunidades, diseño, implementación y mejora continua.",
      },
      {
        id: "s-7-5",
        title: "7.5 Etapas",
        text:
          "El servicio se ejecuta por fases: análisis, evaluación técnica, diseño de propuesta, validación, implementación y seguimiento.",
      },
      {
        id: "s-7-6",
        title: "7.6 Herramientas",
        text:
          "Utiliza dashboards, seguimiento de carga, análisis de costos, simulación de rutas y herramientas de control operativo.",
      },
    ],
  },
  {
    id: "sec-8",
    number: "8",
    title: "ESTRATEGIAS DE OPTIMIZACIÓN",
    intro:
      "En esta parte se traducen los hallazgos en acciones concretas de mejora.",
    subsections: [
      {
        id: "s-8-1",
        title: "8.1 Optimización de rutas",
        text:
          "Buscar rutas con mejor relación entre distancia, tiempo, riesgo y estabilidad. No se trata solo de kilómetros, sino de variabilidad operativa.",
      },
      {
        id: "s-8-2",
        title: "8.2 Reducción de costos",
        text:
          "Reducir costos significa rediseñar el sistema, negociar mejor y eliminar ineficiencias estructurales, no solo bajar tarifas.",
      },
      {
        id: "s-8-3",
        title: "8.3 Mejora de tiempos",
        text:
          "Menos tiempo logístico significa menos capital inmovilizado y mejor rotación. La meta es sincronizar etapas y reducir esperas.",
      },
      {
        id: "s-8-4",
        title: "8.4 Integración logística",
        text:
          "La cadena debe dejar de ser fragmentada. Integrar actores y decisiones es clave para mejorar desempeño.",
      },
      {
        id: "s-8-5",
        title: "8.5 Tecnología",
        text:
          "Se propone usar tracking, análisis continuo y visibilidad operativa para pasar de decisiones reactivas a decisiones basadas en datos.",
      },
      {
        id: "s-8-6",
        title: "8.6 Consolidación",
        text:
          "Consolidar carga mejora uso de contenedores, reduce costo unitario y fortalece negociación con proveedores logísticos.",
      },
      {
        id: "s-8-7",
        title: "8.7 Negociación",
        text:
          "Negociar mejor requiere volumen, comparativos y relaciones de mediano plazo con operadores logísticos.",
      },
    ],
  },
  {
    id: "sec-9",
    number: "9",
    title: "PROPUESTA DE MEJORA",
    intro:
      "La propuesta aterriza los cambios estructurales necesarios para mejorar la operación.",
    subsections: [
      {
        id: "s-9-1",
        title: "9.1 Rediseño logístico",
        text:
          "Se plantea una cadena más simple, con menos puntos intermedios innecesarios, mayor continuidad y mejor secuencia operativa.",
      },
      {
        id: "s-9-2",
        title: "9.2 Selección de rutas",
        text:
          "No se trata de eliminar la ruta actual, sino de usarla mejor y combinarla con opciones alternativas cuando convenga.",
      },
      {
        id: "s-9-3",
        title: "9.3 Coordinación",
        text:
          "La coordinación centralizada debe conectar extracción, acopio, procesamiento, transporte y exportación dentro de un mismo flujo.",
      },
      {
        id: "s-9-4",
        title: "9.4 Reducción de costos",
        text:
          "La reducción viene de optimización terrestre, consolidación, mejor negociación, menos intermediarios y mejor secuencia operativa.",
      },
      {
        id: "s-9-5",
        title: "9.5 KPIs",
        text:
          "Los indicadores clave incluyen costo logístico por tonelada, tiempo total, permanencia en acopio, utilización de capacidad y cumplimiento de entrega.",
      },
      {
        id: "s-9-6",
        title: "9.6 Plan de implementación",
        text:
          "La implementación debe ir por fases: preparación, implementación inicial y optimización continua con seguimiento.",
      },
    ],
  },
  {
    id: "sec-10",
    number: "10",
    title: "EVALUACIÓN DE IMPACTO",
    intro:
      "Esta parte estima los beneficios que tendría el rediseño propuesto.",
    subsections: [
      {
        id: "s-10-1",
        title: "10.1 Beneficios económicos",
        text:
          "La mejora logística genera impacto directo en rentabilidad sin necesidad de cambiar el proceso productivo.",
      },
      {
        id: "s-10-2",
        title: "10.2 Reducción de costos",
        text:
          "El mayor impacto esperado está en transporte terrestre y marítimo, que concentran casi todo el costo logístico.",
      },
      {
        id: "s-10-3",
        title: "10.3 Mejora de tiempos",
        text:
          "Reducir tiempos mejora capital de trabajo, respuesta al mercado y continuidad operativa.",
      },
      {
        id: "s-10-4",
        title: "10.4 Eficiencia",
        text:
          "La eficiencia mejora cuando la cadena deja de operar por fragmentos y empieza a funcionar como sistema integrado.",
      },
      {
        id: "s-10-5",
        title: "10.5 Competitividad",
        text:
          "Una logística mejor baja costo final, mejora márgenes y fortalece el posicionamiento internacional del producto.",
      },
    ],
  },
  {
    id: "sec-11",
    number: "11",
    title: "ANÁLISIS DE RIESGOS",
    intro:
      "Se clasifica el riesgo para entender qué puede salir mal y cómo mitigarlo.",
    subsections: [
      {
        id: "s-11-1",
        title: "11.1 Operativos",
        text:
          "Riesgos ligados a mala coordinación, retrasos en acopio, baja estandarización y dependencia de procesos manuales.",
      },
      {
        id: "s-11-2",
        title: "11.2 Económicos",
        text:
          "Riesgos por cambios en tarifas de transporte, volatilidad del mercado y presión sobre márgenes.",
      },
      {
        id: "s-11-3",
        title: "11.3 Logísticos",
        text:
          "Riesgos derivados de depender de una sola ruta, pocos operadores y baja diversificación.",
      },
      {
        id: "s-11-4",
        title: "11.4 Mitigación",
        text:
          "La mitigación pasa por integrar el sistema, planificar mejor, diversificar rutas y proveedores, usar KPIs y aplicar tecnología.",
      },
    ],
  },
  {
    id: "sec-12",
    number: "12",
    title: "CASO PRÁCTICO",
    intro:
      "Esta sección aterriza el análisis en el caso HOYO19.",
    subsections: [
      {
        id: "s-12-1",
        title: "12.1 Empresa",
        text:
          "HOYO19 es una exportadora boliviana de antimonio que envía producto con frecuencia aproximada bimensual hacia Estados Unidos.",
      },
      {
        id: "s-12-2",
        title: "12.2 Situación inicial",
        text:
          "La empresa opera, pero lo hace con una cadena dependiente de terceros, tiempos largos, pocos nodos de acopio y baja visibilidad operativa.",
      },
      {
        id: "s-12-3",
        title: "12.3 Diagnóstico",
        text:
          "El cuello de botella principal está en el acopio y en la dependencia de pocos actores. El costo logístico es la mayor presión económica de la operación.",
      },
      {
        id: "s-12-4",
        title: "12.4 Propuesta",
        text:
          "Se propone diversificar abastecimiento, ampliar nodos de acopio, mejorar la red de transporte, sumar herramientas de control y coordinar todo de forma centralizada.",
      },
      {
        id: "s-12-5",
        title: "12.5 Resultados",
        text:
          "Los resultados esperados son mayor continuidad, menos tiempos improductivos, mejor negociación y más capacidad para crecer sin romper la operación.",
      },
      {
        id: "s-12-6",
        title: "12.6 Comparación antes/después",
        text:
          "Antes había dependencia y baja flexibilidad. Después se espera una red más diversificada, más control y una operación más escalable.",
      },
    ],
  },
  {
    id: "sec-13",
    number: "13",
    title: "CONCLUSIONES",
    intro:
      "Las conclusiones muestran por qué el transporte es el centro real del problema y de la solución.",
    subsections: [
      {
        id: "s-13-1",
        title: "13.1 Hallazgos",
        text:
          "El gran hallazgo es que la logística es el principal factor que condiciona costo, tiempo, eficiencia y competitividad.",
      },
      {
        id: "s-13-2",
        title: "13.2 Importancia del transporte",
        text:
          "En este caso, transportar bien no es un detalle operativo. Es una condición básica para que la exportación tenga sentido económico.",
      },
      {
        id: "s-13-3",
        title: "13.3 Evaluación del servicio",
        text:
          "HOYO19 CORE funciona como una solución integral porque ataca los puntos más pesados del sistema, no solo una parte aislada.",
      },
    ],
  },
  {
    id: "sec-14",
    number: "14",
    title: "RECOMENDACIONES",
    intro:
      "Las recomendaciones traducen el análisis en acciones para empresa, industria y entorno país.",
    subsections: [
      {
        id: "s-14-1",
        title: "14.1 Estratégicas",
        text:
          "Centralizar la gestión logística, planificar por demanda, construir relaciones estratégicas y convertir la logística en ventaja competitiva.",
      },
      {
        id: "s-14-2",
        title: "14.2 Operativas",
        text:
          "Diversificar proveedores, eliminar dependencia de un solo acopio, consolidar carga, optimizar flujo continuo y reducir intermediarios.",
      },
      {
        id: "s-14-3",
        title: "14.3 Empresas mineras",
        text:
          "Las empresas mineras deberían invertir más en visibilidad operativa, datos, coordinación y diseño logístico, no solo en producción.",
      },
      {
        id: "s-14-4",
        title: "14.4 Nivel país",
        text:
          "A nivel país, mejorar infraestructura, conectividad logística y estabilidad operativa sería clave para fortalecer la competitividad exportadora.",
      },
    ],
  },
  {
    id: "sec-15",
    number: "15",
    title: "BIBLIOGRAFÍA",
    intro:
      "El informe se apoya en literatura de logística, cadena de suministro y fuentes del sector minero.",
    subsections: [
      {
        id: "s-15-1",
        title: "15.1 Fuentes",
        text:
          "Incluye referencias sobre antimonio en Bolivia, estudios de CEPAL, UNCTAD, Banco Mundial y textos de logística y supply chain.",
      },
    ],
  },
  {
    id: "sec-16",
    number: "16",
    title: "ANEXOS",
    intro:
      "Material complementario del informe.",
    subsections: [
      {
        id: "s-16-1",
        title: "16.1 Mapas",
        text:
          "Mapas de la red logística y corredores relevantes.",
      },
      {
        id: "s-16-2",
        title: "16.2 Tablas",
        text:
          "Tablas con costos, tiempos, indicadores y comparaciones.",
      },
      {
        id: "s-16-3",
        title: "16.3 Diagramas",
        text:
          "Diagramas del flujo logístico, modelo del servicio y ruta exportadora.",
      },
      {
        id: "s-16-4",
        title: "16.4 Entrevistas",
        text:
          "Notas y hallazgos cualitativos usados para complementar el análisis.",
      },
    ],
  },
];

const allAnchors = sections.flatMap((section) => [
  { id: section.id, label: `${section.number}. ${section.title}`, type: "section" as const },
  ...section.subsections.map((sub) => ({
    id: sub.id,
    label: sub.title,
    type: "sub" as const,
  })),
]);

const scenarioValues = {
  actual: {
    totalDays: 75,
    totalCost: 587,
    bottleneck: "Acopio y coordinación entre actores",
    routeLabel: "Ruta principal actual",
    internalCostPerTon: 32,
    landCostPerTon: 165,
    seaCostPerTon: 390,
    acopioDays: 25,
    processingDays: 15,
    exportDays: 35,
    kpiCost: 587,
    kpiTime: 75,
    kpiProviders: 1,
    kpiVisibility: 35,
  },
  optimizado: {
    totalDays: 60,
    totalCost: 470,
    bottleneck: "Menor fricción por integración y consolidación",
    routeLabel: "Ruta optimizada con mejor coordinación",
    internalCostPerTon: 28,
    landCostPerTon: 135,
    seaCostPerTon: 307,
    acopioDays: 16,
    processingDays: 13,
    exportDays: 31,
    kpiCost: 470,
    kpiTime: 60,
    kpiProviders: 3,
    kpiVisibility: 82,
  },
};

function slugToTitle(id: string) {
  const match = allAnchors.find((a) => a.id === id);
  return match?.label ?? id;
}

export default function Page() {
  const [scenario, setScenario] = useState<Scenario>("actual");
  const [activeId, setActiveId] = useState<string>("sec-1");
  const chartInstances = useRef<Chart[]>([]);

  const scenarioData = scenarioValues[scenario];

  const chartData = useMemo(() => {
    return {
      productionByCountry: {
        labels: ["China", "Tayikistán", "Rusia", "Myanmar", "Bolivia", "Turquía", "Otros"],
        values: [57.8, 21.7, 7.2, 6.0, 3.6, 2.4, 1.3],
      },
      applications: {
        labels: ["Retardantes de llama", "Baterías", "Aleaciones", "Químicos", "Otros"],
        values: [42, 25, 15, 10, 8],
      },
      distances: {
        labels: ["Potosí → Cochabamba", "Cochabamba → Arica", "Arica → Houston"],
        values: [407, 780, 8500],
      },
      timeline: {
        labels: ["Acopio", "Procesamiento", "Exportación"],
        values:
          scenario === "actual"
            ? [scenarioData.acopioDays, scenarioData.processingDays, scenarioData.exportDays]
            : [scenarioData.acopioDays, scenarioData.processingDays, scenarioData.exportDays],
      },
      costsByType: {
        labels: ["Mina → planta", "Planta → puerto", "Marítimo"],
        values: [
          scenarioData.internalCostPerTon,
          scenarioData.landCostPerTon,
          scenarioData.seaCostPerTon,
        ],
      },
      sensitivity: {
        labels: [
          "Caso base",
          "+10% terrestre",
          "-10% marítimo",
          "-20% volumen",
          "Ruta alterna",
        ],
        values: scenario === "actual" ? [587, 603, 548, 640, 562] : [470, 486, 439, 515, 448],
      },
      comparison: {
        labels: ["Costo logístico", "Tiempo total", "Visibilidad", "Diversificación"],
        actual: [587, 75, 35, 1],
        optimizado: [470, 60, 82, 3],
      },
      risks: {
        labels: ["Operativos", "Logísticos", "Económicos", "Externos"],
        actual: [4, 4, 3.5, 3],
        optimizado: [2.8, 2.7, 2.9, 2.8],
      },
      marketProjection: {
        labels: ["2022", "2023", "2024", "2025", "2026", "2028", "2030", "2034"],
        values: [80, 82, 84, 86.6, 88, 92, 96, 104.5],
      },
    };
  }, [scenario, scenarioData]);

  useEffect(() => {
    const ids = allAnchors.map((a) => a.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.1, 0.3, 0.5, 0.7],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    chartInstances.current.forEach((chart) => chart.destroy());
    chartInstances.current = [];

    const makeChart = (id: string, config: ChartConfiguration) => {
      const canvas = document.getElementById(id) as HTMLCanvasElement | null;
      if (!canvas) return;
      const instance = new Chart(canvas, config);
      chartInstances.current.push(instance);
    };

    makeChart("chart-production", {
      type: "bar",
      data: {
        labels: chartData.productionByCountry.labels,
        datasets: [
          {
            label: "Participación global (%)",
            data: chartData.productionByCountry.values,
            backgroundColor: [
              "#60a5fa",
              "#34d399",
              "#f59e0b",
              "#f87171",
              "#a78bfa",
              "#22d3ee",
              "#94a3b8",
            ],
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#94a3b8" },
            grid: { color: "rgba(148,163,184,0.15)" },
          },
          x: {
            ticks: { color: "#cbd5e1" },
            grid: { display: false },
          },
        },
      },
    });

    makeChart("chart-applications", {
      type: "doughnut",
      data: {
        labels: chartData.applications.labels,
        datasets: [
          {
            data: chartData.applications.values,
            backgroundColor: ["#60a5fa", "#34d399", "#f59e0b", "#f87171", "#a78bfa"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#cbd5e1" },
          },
        },
      },
    });

    makeChart("chart-distances", {
      type: "bar",
      data: {
        labels: chartData.distances.labels,
        datasets: [
          {
            label: "Distancia (km)",
            data: chartData.distances.values,
            backgroundColor: ["#38bdf8", "#22c55e", "#f97316"],
            borderRadius: 10,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            ticks: { color: "#94a3b8" },
            grid: { color: "rgba(148,163,184,0.15)" },
          },
          y: {
            ticks: { color: "#cbd5e1" },
            grid: { display: false },
          },
        },
      },
    });

    makeChart("chart-timeline", {
      type: "bar",
      data: {
        labels: chartData.timeline.labels,
        datasets: [
          {
            label: "Días",
            data: chartData.timeline.values,
            backgroundColor:
              scenario === "actual"
                ? ["#f59e0b", "#fb7185", "#60a5fa"]
                : ["#22c55e", "#34d399", "#38bdf8"],
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#94a3b8" },
            grid: { color: "rgba(148,163,184,0.15)" },
          },
          x: {
            ticks: { color: "#cbd5e1" },
            grid: { display: false },
          },
        },
      },
    });

    makeChart("chart-costs", {
      type: "bar",
      data: {
        labels: chartData.costsByType.labels,
        datasets: [
          {
            label: "USD por tonelada",
            data: chartData.costsByType.values,
            backgroundColor:
              scenario === "actual"
                ? ["#f59e0b", "#fb7185", "#ef4444"]
                : ["#22c55e", "#34d399", "#38bdf8"],
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#94a3b8" },
            grid: { color: "rgba(148,163,184,0.15)" },
          },
          x: {
            ticks: { color: "#cbd5e1" },
            grid: { display: false },
          },
        },
      },
    });

    makeChart("chart-sensitivity", {
      type: "line",
      data: {
        labels: chartData.sensitivity.labels,
        datasets: [
          {
            label: "Costo total estimado",
            data: chartData.sensitivity.values,
            borderColor: scenario === "actual" ? "#fb7185" : "#34d399",
            backgroundColor: scenario === "actual" ? "rgba(251,113,133,0.2)" : "rgba(52,211,153,0.2)",
            tension: 0.35,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: "#cbd5e1" },
          },
        },
        scales: {
          y: {
            ticks: { color: "#94a3b8" },
            grid: { color: "rgba(148,163,184,0.15)" },
          },
          x: {
            ticks: { color: "#cbd5e1" },
            grid: { display: false },
          },
        },
      },
    });

    makeChart("chart-comparison", {
      type: "bar",
      data: {
        labels: chartData.comparison.labels,
        datasets: [
          {
            label: "Actual",
            data: chartData.comparison.actual,
            backgroundColor: "#f59e0b",
            borderRadius: 10,
          },
          {
            label: "Optimizado",
            data: chartData.comparison.optimizado,
            backgroundColor: "#22c55e",
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: "#cbd5e1" },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#94a3b8" },
            grid: { color: "rgba(148,163,184,0.15)" },
          },
          x: {
            ticks: { color: "#cbd5e1" },
            grid: { display: false },
          },
        },
      },
    });

    makeChart("chart-risks", {
      type: "radar",
      data: {
        labels: chartData.risks.labels,
        datasets: [
          {
            label: "Nivel de riesgo",
            data: scenario === "actual" ? chartData.risks.actual : chartData.risks.optimizado,
            borderColor: scenario === "actual" ? "#fb7185" : "#34d399",
            backgroundColor:
              scenario === "actual"
                ? "rgba(251,113,133,0.22)"
                : "rgba(52,211,153,0.22)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: { color: "#94a3b8", backdropColor: "transparent" },
            grid: { color: "rgba(148,163,184,0.2)" },
            pointLabels: { color: "#cbd5e1" },
          },
        },
        plugins: {
          legend: {
            labels: { color: "#cbd5e1" },
          },
        },
      },
    });

    makeChart("chart-market", {
      type: "line",
      data: {
        labels: chartData.marketProjection.labels,
        datasets: [
          {
            label: "Demanda estimada (kt)",
            data: chartData.marketProjection.values,
            borderColor: "#60a5fa",
            backgroundColor: "rgba(96,165,250,0.18)",
            tension: 0.35,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: "#cbd5e1" },
          },
        },
        scales: {
          y: {
            ticks: { color: "#94a3b8" },
            grid: { color: "rgba(148,163,184,0.15)" },
          },
          x: {
            ticks: { color: "#cbd5e1" },
            grid: { display: false },
          },
        },
      },
    });

    return () => {
      chartInstances.current.forEach((chart) => chart.destroy());
      chartInstances.current = [];
    };
  }, [chartData, scenario]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderSubsection = (sub: Subsection) => (
    <div
      id={sub.id}
      key={sub.id}
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/5 p-5"
    >
      <h4 className="mb-2 text-base font-semibold text-white">{sub.title}</h4>
      <p className="text-sm leading-7 text-slate-300">{sub.text}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-[320px] shrink-0 overflow-y-auto border-r border-white/10 bg-[#081221] px-5 py-6 lg:block">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300">
              Informe interactivo
            </p>
            <h1 className="mt-2 text-2xl font-bold leading-tight">
              HOYO 19
              <span className="block text-slate-300">
                Optimización logística minera
              </span>
            </h1>
          </div>

          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-400">
              Escenario
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setScenario("actual")}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  scenario === "actual"
                    ? "bg-amber-400 text-slate-900"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                Actual
              </button>
              <button
                onClick={() => setScenario("optimizado")}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  scenario === "optimizado"
                    ? "bg-emerald-400 text-slate-900"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                Optimizado
              </button>
            </div>
          </div>

          <nav className="space-y-2">
            {sections.map((section) => {
              const sectionActive =
                activeId === section.id ||
                section.subsections.some((sub) => sub.id === activeId);

              return (
                <div key={section.id} className="rounded-2xl">
                  <button
                    onClick={() => scrollToId(section.id)}
                    className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                      sectionActive
                        ? "bg-sky-500/15 text-sky-300"
                        : "text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {section.number}. {section.title}
                  </button>

                  <div className="mt-1 ml-3 space-y-1 border-l border-white/10 pl-3">
                    {section.subsections.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => scrollToId(sub.id)}
                        className={`block w-full rounded-lg px-2 py-1.5 text-left text-xs leading-5 transition ${
                          activeId === sub.id
                            ? "bg-white/10 text-white"
                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                        }`}
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <div className="mb-6 rounded-[28px] border border-white/10 bg-gradient-to-br from-sky-500/10 via-white/5 to-emerald-500/10 p-6">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-sky-300">
                  Caso práctico · Bolivia → Estados Unidos
                </p>
                <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                  Informe de asesoramiento y optimización del transporte en la exportación de minerales
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  Esta página convierte tu informe en un dashboard navegable. El índice de la izquierda está conectado
                  con cada punto, y los gráficos cambian según el escenario seleccionado.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <MetricCard label="Costo logístico" value={`$${scenarioData.kpiCost}/t`} tone={scenario} />
                <MetricCard label="Tiempo total" value={`${scenarioData.kpiTime} días`} tone={scenario} />
                <MetricCard label="Proveedores" value={`${scenarioData.kpiProviders}`} tone={scenario} />
                <MetricCard label="Visibilidad" value={`${scenarioData.kpiVisibility}%`} tone={scenario} />
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-4 xl:grid-cols-3">
            <InfoCard
              title="Ruta activa"
              text={scenarioData.routeLabel}
            />
            <InfoCard
              title="Principal cuello de botella"
              text={scenarioData.bottleneck}
            />
            <InfoCard
              title="Escenario seleccionado"
              text={scenario === "actual" ? "Operación actual" : "Escenario optimizado"}
            />
          </div>

          <section id="sec-1" className="scroll-mt-24">
            <SectionHeader
              number="1"
              title="INTRODUCCIÓN"
              intro={sections[0].intro}
            />
            <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                {sections[0].subsections.map(renderSubsection)}
              </div>
              <ChartCard
                title="Producción mundial de antimonio por país"
                description="Ayuda a entender el contexto global y por qué la eficiencia logística importa tanto para países con menor participación."
              >
                <canvas id="chart-production" height={300} />
              </ChartCard>
            </div>
          </section>

          <section id="sec-2" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="2"
              title="MARCO CONCEPTUAL Y LOGÍSTICO"
              intro={sections[1].intro}
            />
            <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
              <div className="space-y-4">{sections[1].subsections.map(renderSubsection)}</div>
              <div className="space-y-5">
                <ChartCard
                  title="Aplicaciones industriales del antimonio"
                  description="Muestra dónde se concentra la demanda del mineral."
                >
                  <canvas id="chart-applications" height={280} />
                </ChartCard>

                <ChartCard
                  title="Proyección del mercado global"
                  description="Proyección de demanda estimada del mercado del antimonio."
                >
                  <canvas id="chart-market" height={280} />
                </ChartCard>
              </div>
            </div>
          </section>

          <section id="sec-3" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="3"
              title="DIAGNÓSTICO DEL SISTEMA ACTUAL"
              intro={sections[2].intro}
            />
            <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
              <div className="space-y-4">{sections[2].subsections.map(renderSubsection)}</div>
              <div className="space-y-5">
                <ChartCard
                  title="Distancias por tramo"
                  description="La ruta principal sigue Potosí → Cochabamba → Arica → Houston."
                >
                  <canvas id="chart-distances" height={280} />
                </ChartCard>

                <ChartCard
                  title="Tiempos por etapa"
                  description="Este gráfico cambia con el escenario y te deja ver dónde se gana tiempo."
                >
                  <canvas id="chart-timeline" height={280} />
                </ChartCard>
              </div>
            </div>
          </section>

          <section id="sec-4" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="4"
              title="ANÁLISIS DE TRANSPORTE"
              intro={sections[3].intro}
            />
            <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
              <div className="space-y-4">{sections[3].subsections.map(renderSubsection)}</div>
              <ChartCard
                title="Riesgos por categoría"
                description="El radar cambia con el escenario para mostrar cómo bajan los riesgos en una cadena mejor integrada."
              >
                <canvas id="chart-risks" height={360} />
              </ChartCard>
            </div>
          </section>

          <section id="sec-5" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="5"
              title="COSTOS LOGÍSTICOS Y ANÁLISIS ECONÓMICO"
              intro={sections[4].intro}
            />
            <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
              <div className="space-y-4">{sections[4].subsections.map(renderSubsection)}</div>
              <div className="space-y-5">
                <ChartCard
                  title="Costos por tipo de transporte"
                  description="Gráfico interactivo conectado al escenario actual u optimizado."
                >
                  <canvas id="chart-costs" height={280} />
                </ChartCard>

                <ChartCard
                  title="Sensibilidad del costo logístico"
                  description="Te permite ver cómo cambia el costo total ante variaciones operativas."
                >
                  <canvas id="chart-sensitivity" height={280} />
                </ChartCard>
              </div>
            </div>
          </section>

          <section id="sec-6" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="6"
              title="PROBLEMÁTICA"
              intro={sections[5].intro}
            />
            <div className="space-y-4">{sections[5].subsections.map(renderSubsection)}</div>
          </section>

          <section id="sec-7" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="7"
              title="DISEÑO DEL SERVICIO (HOYO19 CORE)"
              intro={sections[6].intro}
            />
            <div className="space-y-4">{sections[6].subsections.map(renderSubsection)}</div>
          </section>

          <section id="sec-8" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="8"
              title="ESTRATEGIAS DE OPTIMIZACIÓN"
              intro={sections[7].intro}
            />
            <div className="space-y-4">{sections[7].subsections.map(renderSubsection)}</div>
          </section>

          <section id="sec-9" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="9"
              title="PROPUESTA DE MEJORA"
              intro={sections[8].intro}
            />
            <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
              <div className="space-y-4">{sections[8].subsections.map(renderSubsection)}</div>
              <ChartCard
                title="Comparación actual vs optimizado"
                description="Este gráfico resume el valor de la propuesta en costo, tiempo, visibilidad y diversificación."
              >
                <canvas id="chart-comparison" height={320} />
              </ChartCard>
            </div>
          </section>

          <section id="sec-10" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="10"
              title="EVALUACIÓN DE IMPACTO"
              intro={sections[9].intro}
            />
            <div className="space-y-4">{sections[9].subsections.map(renderSubsection)}</div>
          </section>

          <section id="sec-11" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="11"
              title="ANÁLISIS DE RIESGOS"
              intro={sections[10].intro}
            />
            <div className="space-y-4">{sections[10].subsections.map(renderSubsection)}</div>
          </section>

          <section id="sec-12" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="12"
              title="CASO PRÁCTICO"
              intro={sections[11].intro}
            />
            <div className="space-y-4">{sections[11].subsections.map(renderSubsection)}</div>
          </section>

          <section id="sec-13" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="13"
              title="CONCLUSIONES"
              intro={sections[12].intro}
            />
            <div className="space-y-4">{sections[12].subsections.map(renderSubsection)}</div>
          </section>

          <section id="sec-14" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="14"
              title="RECOMENDACIONES"
              intro={sections[13].intro}
            />
            <div className="space-y-4">{sections[13].subsections.map(renderSubsection)}</div>
          </section>

          <section id="sec-15" className="mt-12 scroll-mt-24">
            <SectionHeader
              number="15"
              title="BIBLIOGRAFÍA"
              intro={sections[14].intro}
            />
            <div className="space-y-4">{sections[14].subsections.map(renderSubsection)}</div>
          </section>

          <section id="sec-16" className="mt-12 mb-16 scroll-mt-24">
            <SectionHeader
              number="16"
              title="ANEXOS"
              intro={sections[15].intro}
            />
            <div className="space-y-4">{sections[15].subsections.map(renderSubsection)}</div>
          </section>
        </main>
      </div>

      <div className="fixed bottom-4 right-4 z-40 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-slate-200 backdrop-blur md:hidden">
        {slugToTitle(activeId)}
      </div>
    </div>
  );
}

function SectionHeader({
  number,
  title,
  intro,
}: {
  number: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-5 rounded-[28px] border border-white/10 bg-white/5 p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-sky-300">
        Sección {number}
      </p>
      <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h3>
      {intro ? <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">{intro}</p> : null}
    </div>
  );
}

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[#0b1728] p-5">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="mt-2 mb-4 text-sm leading-6 text-slate-300">{description}</p>
      {children}
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.15em] text-slate-400">{title}</p>
      <p className="mt-2 text-sm font-medium leading-6 text-white">{text}</p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: Scenario;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        tone === "actual"
          ? "border-amber-300/20 bg-amber-300/10"
          : "border-emerald-300/20 bg-emerald-300/10"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.15em] text-slate-300">{label}</p>
      <p className="mt-2 text-xl font-bold text-white">{value}</p>
    </div>
  );
}