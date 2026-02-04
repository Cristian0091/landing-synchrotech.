// ========== CÓDIGO JAVASCRIPT COMPLETO ==========

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año actual en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Botón para volver al inicio
    const backToTopButton = document.getElementById('back-to-top');
    
    // Mostrar/ocultar botón al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Función para volver al inicio
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== DIAGRAMA DE ESPINA DE PESCADO MEJORADO ==========
    
    // Datos completos para cada categoría
    const categoryData = {
        family: {
            title: 'Factores Familiares',
            description: 'La familia es el primer entorno socializador y su influencia es determinante en el desarrollo de conductas de riesgo o protectoras frente a las drogas. Un ambiente familiar disfuncional puede aumentar hasta 4 veces el riesgo de consumo problemático.',
            details: [
                'Historial familiar de consumo de drogas o alcohol (factor genético y ambiental)',
                'Conflictos familiares constantes y falta de habilidades para resolver problemas',
                'Falta de supervisión parental y límites inconsistentes en la crianza',
                'Comunicación deficiente o nula sobre temas importantes',
                'Experiencias de abuso físico, emocional o sexual en la infancia',
                'Falta de apoyo emocional y vínculos afectivos débiles entre miembros',
                'Modelos parentales que normalizan el consumo de sustancias'
            ],
            sources: 'OMS, NIDA (National Institute on Drug Abuse), estudios longitudinales familiares',
            impact: 85,
            color: '#3498db'
        },
        social: {
            title: 'Factores Sociales',
            description: 'El entorno social inmediato ejerce una presión significativa sobre las decisiones individuales. La normalización del consumo en ciertos grupos y la presión de pares son factores críticos en el inicio del consumo, especialmente durante la adolescencia.',
            details: [
                'Presión de grupo para consumir sustancias (especialmente en adolescentes)',
                'Normalización del consumo en el entorno cercano (amigos, compañeros)',
                'Disponibilidad y acceso fácil a drogas en la comunidad',
                'Falta de oportunidades recreativas, deportivas y de desarrollo personal',
                'Marginación social, exclusión y falta de sentido de pertenencia',
                'Cultura que glorifica o minimiza los riesgos del consumo de sustancias',
                'Falta de redes de apoyo social positivas y constructivas'
            ],
            sources: 'Estudios sociológicos, investigaciones sobre presión de pares en adolescentes',
            impact: 75,
            color: '#9b59b6'
        },
        psychological: {
            title: 'Factores Psicológicos',
            description: 'Las características psicológicas individuales y los trastornos mentales no tratados son factores de riesgo significativos. Muchas personas usan drogas como mecanismo de afrontamiento para problemas emocionales no resueltos.',
            details: [
                'Baja autoestima y falta de confianza en las propias capacidades',
                'Problemas de salud mental no tratados (depresión, ansiedad, TDAH, trastorno bipolar)',
                'Dificultad para manejar emociones negativas (estrés, ira, tristeza, frustración)',
                'Curiosidad y búsqueda de sensaciones nuevas o intensas (personalidad impulsiva)',
                'Problemas de conducta, trastorno oposicionista desafiante en la adolescencia',
                'Falta de habilidades de afrontamiento y resolución de problemas',
                'Tendencia a la impulsividad y toma de riesgos sin evaluar consecuencias'
            ],
            sources: 'Manual Diagnóstico DSM-5, estudios sobre comorbilidad psiquiátrica',
            impact: 80,
            color: '#1abc9c'
        },
        economic: {
            title: 'Factores Económicos',
            description: 'Las condiciones económicas adversas limitan las oportunidades y aumentan la vulnerabilidad. La pobreza no es una causa directa, pero crea condiciones que facilitan el inicio y mantenimiento del consumo.',
            details: [
                'Pobreza y desigualdad económica estructural',
                'Desempleo y falta de oportunidades laborales dignas',
                'Falta de acceso a educación de calidad y oportunidades de movilidad social',
                'Acceso limitado a servicios de salud y programas preventivos',
                'Economías ilícitas atractivas para poblaciones con pocas alternativas',
                'Falta de vivienda digna y condiciones de vida precarias',
                'Exposición a entornos de comercio ilegal de drogas como "opción económica"'
            ],
            sources: 'Informes del Banco Mundial, estudios sobre determinantes sociales de la salud',
            impact: 65,
            color: '#f39c12'
        },
        environmental: {
            title: 'Presión del Entorno',
            description: 'El entorno físico y social inmediato ejerce influencia constante. Vivir en áreas con alta prevalencia de consumo normaliza la conducta y limita las alternativas disponibles.',
            details: [
                'Ambiente de alto riesgo (barrios con alta prevalencia de drogas y violencia)',
                'Exposición temprana a drogas en el entorno cercano (familia, vecindario)',
                'Influencia de medios de comunicación que normalizan o glorifican el consumo',
                'Ambientes laborales estresantes que fomentan el consumo como "válvula de escape"',
                'Vivienda en zonas con alta criminalidad asociada al narcotráfico',
                'Falta de espacios públicos seguros y recreativos para el tiempo libre',
                'Exposición a violencia relacionada con el narcotráfico desde temprana edad'
            ],
            sources: 'Estudios epidemiológicos de área, investigaciones sobre entornos de riesgo',
            impact: 70,
            color: '#e74c3c'
        },
        information: {
            title: 'Falta de Información',
            description: 'La desinformación y los mitos sobre las drogas aumentan la vulnerabilidad. La educación preventiva basada en evidencia es una de las estrategias más efectivas para reducir el consumo.',
            details: [
                'Desconocimiento de los riesgos reales asociados al consumo de diferentes sustancias',
                'Información errónea o mitos sobre las drogas ("solo una vez no pasa nada", "controlo")',
                'Falta de educación preventiva basada en evidencia en escuelas y comunidades',
                'Estigmatización que dificulta el diálogo abierto y honesto sobre drogas',
                'Acceso limitado a fuentes confiables y científicas de información',
                'Publicidad engañosa sobre sustancias "recreativas" o "mejoras cognitivas"',
                'Falta de programas de prevención escolar continuos y de calidad'
            ],
            sources: 'UNODC, evaluaciones de programas preventivos, estudios sobre percepciones de riesgo',
            impact: 60,
            color: '#34495e'
        }
    };
    
    // Variables globales
    let currentCategory = 'family';
    let visitedCategories = new Set(['family']);
    const categoryOrder = ['family', 'social', 'psychological', 'economic', 'environmental', 'information'];
    
    // Elementos del DOM
    const bones = document.querySelectorAll('.bone');
    const infoTitle = document.getElementById('info-title');
    const infoText = document.getElementById('info-text');
    const infoList = document.getElementById('info-list');
    const infoSources = document.getElementById('info-sources');
    const visualFill = document.getElementById('visual-fill');
    const infoCount = document.getElementById('info-count');
    const resetBtn = document.getElementById('reset-diagram');
    const showAllBtn = document.getElementById('show-all');
    const prevBtn = document.getElementById('prev-category');
    const nextBtn = document.getElementById('next-category');
    const progressDots = document.querySelectorAll('.progress-dot');
    const fishHead = document.querySelector('.fish-head');
    
    // Inicializar diagrama
    function initFishboneDiagram() {
        // Configurar evento para la cabeza del pez
        fishHead.addEventListener('click', () => {
            showOverview();
        });
        
        // Configurar eventos para cada espina
        bones.forEach(bone => {
            bone.addEventListener('click', function(e) {
                e.stopPropagation();
                const category = this.getAttribute('data-category');
                selectCategory(category);
            });
            
            // Efectos hover
            bone.addEventListener('mouseenter', function() {
                const category = this.getAttribute('data-category');
                highlightBone(category, true);
            });
            
            bone.addEventListener('mouseleave', function() {
                const category = this.getAttribute('data-category');
                highlightBone(category, false);
            });
        });
        
        // Configurar botón de reinicio
        resetBtn.addEventListener('click', resetDiagram);
        
        // Configurar botón para mostrar todas
        showAllBtn.addEventListener('click', showAllCategories);
        
        // Configurar navegación
        prevBtn.addEventListener('click', showPreviousCategory);
        nextBtn.addEventListener('click', showNextCategory);
        
        // Configurar puntos de progreso
        progressDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                selectCategory(category);
            });
        });
        
        // Mostrar categoría inicial
        selectCategory('family');
    }
    
    // Función para seleccionar una categoría
    function selectCategory(category) {
        // Actualizar categoría actual
        currentCategory = category;
        
        // Añadir a categorías visitadas
        visitedCategories.add(category);
        
        // Actualizar interfaz
        updateCategoryInfo(category);
        updateActiveBone(category);
        updateProgressDots();
        updateNavigationButtons();
        updateStats();
        
        // Scroll suave al panel en móviles
        if (window.innerWidth < 768) {
            document.querySelector('.info-panel').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }
    }
    
    // Actualizar información de la categoría
    function updateCategoryInfo(category) {
        const data = categoryData[category];
        
        // Actualizar texto
        infoTitle.textContent = data.title;
        infoText.textContent = data.description;
        infoSources.textContent = `Fuentes: ${data.sources}`;
        
        // Actualizar lista de detalles
        infoList.innerHTML = '';
        data.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            infoList.appendChild(li);
        });
        
        // Actualizar barra de impacto visual
        visualFill.style.width = `${data.impact}%`;
        
        // Agregar animación
        visualFill.style.transition = 'width 1s ease';
    }
    
    // Resaltar hueso activo
    function updateActiveBone(category) {
        // Remover clase activa de todos los huesos
        bones.forEach(bone => {
            bone.classList.remove('active');
        });
        
        // Agregar clase activa al hueso seleccionado
        const activeBone = document.querySelector(`.bone-${category}`);
        if (activeBone) {
            activeBone.classList.add('active');
            
            // Asegurar que esté visible (z-index alto)
            activeBone.style.zIndex = '10';
            
            // Quitar z-index alto de otros huesos después de un tiempo
            setTimeout(() => {
                bones.forEach(bone => {
                    if (bone !== activeBone) {
                        bone.style.zIndex = '';
                    }
                });
            }, 500);
        }
    }
    
    // Resaltar hueso con hover
    function highlightBone(category, isHighlighted) {
        const bone = document.querySelector(`.bone-${category}`);
        if (bone && !bone.classList.contains('active')) {
            if (isHighlighted) {
                bone.classList.add('hover');
                bone.style.transform = 'translateY(-3px)';
            } else {
                bone.classList.remove('hover');
                bone.style.transform = '';
            }
        }
    }
    
    // Actualizar puntos de progreso
    function updateProgressDots() {
        progressDots.forEach(dot => {
            const category = dot.getAttribute('data-category');
            
            // Remover todas las clases
            dot.classList.remove('active', 'visited');
            
            // Agregar clase según estado
            if (category === currentCategory) {
                dot.classList.add('active');
            } else if (visitedCategories.has(category)) {
                dot.classList.add('visited');
            }
        });
    }
    
    // Actualizar botones de navegación
    function updateNavigationButtons() {
        const currentIndex = categoryOrder.indexOf(currentCategory);
        
        // Actualizar botón anterior
        if (currentIndex > 0) {
            prevBtn.disabled = false;
        } else {
            prevBtn.disabled = true;
        }
        
        // Actualizar botón siguiente
        if (currentIndex < categoryOrder.length - 1) {
            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }
    }
    
    // Actualizar estadísticas
    function updateStats() {
        infoCount.textContent = `${visitedCategories.size} de ${categoryOrder.length}`;
    }
    
    // Mostrar categoría anterior
    function showPreviousCategory() {
        const currentIndex = categoryOrder.indexOf(currentCategory);
        if (currentIndex > 0) {
            selectCategory(categoryOrder[currentIndex - 1]);
        }
    }
    
    // Mostrar siguiente categoría
    function showNextCategory() {
        const currentIndex = categoryOrder.indexOf(currentCategory);
        if (currentIndex < categoryOrder.length - 1) {
            selectCategory(categoryOrder[currentIndex + 1]);
        }
    }
    
    // Mostrar vista general
    function showOverview() {
        infoTitle.textContent = 'Visión General del Diagrama';
        infoText.textContent = 'Este diagrama de Ishikawa muestra las principales causas de la drogadicción organizadas en seis categorías. Cada categoría representa un conjunto de factores interrelacionados que contribuyen al problema. La drogadicción es un fenómeno multifactorial que requiere intervenciones en múltiples niveles para su prevención y tratamiento efectivos.';
        infoList.innerHTML = '<li>Seis categorías principales de factores de riesgo</li><li>Enfoque multidimensional para comprender el problema</li><li>Factores interrelacionados que requieren intervenciones integrales</li><li>Base para estrategias de prevención específicas</li>';
        infoSources.textContent = 'Diagrama basado en el modelo de Ishikawa aplicado a problemas de salud pública';
        visualFill.style.width = '100%';
        
        // Remover clase activa de todos los huesos
        bones.forEach(bone => {
            bone.classList.remove('active');
        });
        
        // Actualizar título del panel
        infoTitle.textContent = 'Diagrama de Causas de la Drogadicción';
    }
    
    // Reiniciar diagrama
    function resetDiagram() {
        // Limpiar categorías visitadas
        visitedCategories.clear();
        
        // Seleccionar categoría inicial
        selectCategory('family');
        
        // Feedback visual
        resetBtn.innerHTML = '<i class="fas fa-check"></i> Reiniciado';
        setTimeout(() => {
            resetBtn.innerHTML = '<i class="fas fa-redo"></i> Reiniciar diagrama';
        }, 1500);
    }
    
    // Mostrar todas las categorías
    function showAllCategories() {
        // Visitar todas las categorías
        categoryOrder.forEach(category => {
            visitedCategories.add(category);
        });
        
        // Mostrar última categoría
        selectCategory('information');
        
        // Feedback visual
        showAllBtn.innerHTML = '<i class="fas fa-check"></i> Todas mostradas';
        setTimeout(() => {
            showAllBtn.innerHTML = '<i class="fas fa-eye"></i> Ver todas las causas';
        }, 1500);
    }
    
    // Inicializar el diagrama
    initFishboneDiagram();
    
    // ========== FUNCIONALIDADES ADICIONALES ==========
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si existe
                if (window.innerWidth < 768) {
                    // Aquí podrías cerrar un menú móvil si lo tuvieras
                }
            }
        });
    });
    
    // Efecto de aparición gradual al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    document.querySelectorAll('.section, .consequence-card, .prevention-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Efecto de carga inicial
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animar hero section
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    });
    
    // Efecto de parpadeo en la cabeza del pez
    setInterval(() => {
        fishHead.style.animation = 'none';
        setTimeout(() => {
            fishHead.style.animation = 'pulse 3s infinite';
        }, 10);
    }, 5000);
});