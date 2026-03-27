document.addEventListener('DOMContentLoaded', () => {


    const navColumn = document.querySelector('.nav-column');
    const header = document.querySelector('.navbar-container');


    if (header && !document.querySelector('.mobile-menu-btn')) {
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '☰';


        mobileBtn.style.display = 'none';
        mobileBtn.style.background = 'transparent';
        mobileBtn.style.border = 'none';
        mobileBtn.style.fontSize = '24px';
        mobileBtn.style.cursor = 'pointer';
        mobileBtn.style.color = '#032E15';


        const navActions = document.querySelector('.nav-actions');
        navActions.appendChild(mobileBtn);


        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-menu-close';
        closeBtn.innerHTML = '✕';
        closeBtn.style.display = 'none';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '20px';
        closeBtn.style.background = 'transparent';
        closeBtn.style.border = 'none';
        closeBtn.style.fontSize = '32px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.color = '#032E15';
        closeBtn.style.padding = '8px';
        closeBtn.style.zIndex = '1001';


        const closeMenu = () => {
            navColumn.classList.remove('active-mobile');
            navColumn.style.display = '';
            navColumn.style.position = '';
            navColumn.style.height = '';
            navColumn.style.overflowY = '';
            closeBtn.style.display = 'none';
        };


        mobileBtn.addEventListener('click', () => {
            navColumn.classList.toggle('active-mobile');


            if (navColumn.classList.contains('active-mobile')) {
                navColumn.style.display = 'flex';
                navColumn.style.flexDirection = 'column';
                navColumn.style.justifyContent = 'flex-start';
                navColumn.style.alignItems = 'flex-start';
                navColumn.style.position = 'fixed';
                navColumn.style.top = '0';
                navColumn.style.left = '10%';
                navColumn.style.width = '90%';
                navColumn.style.height = '100vh';
                navColumn.style.background = '#FFFFFF';
                navColumn.style.padding = '80px 20px 40px 20px';
                navColumn.style.boxShadow = '-5px 0 20px rgba(0,0,0,0.1)';
                navColumn.style.zIndex = '1000';
                navColumn.style.overflowY = 'auto';


                if (!navColumn.contains(closeBtn)) {
                    navColumn.appendChild(closeBtn);
                }
                closeBtn.style.display = 'block';


                const innerCol = document.querySelector('.nav-inner-column');
                if (innerCol) {
                    innerCol.style.flexDirection = 'column';
                    innerCol.style.gap = '24px';
                    innerCol.style.alignItems = 'flex-start';
                    innerCol.style.width = '100%';
                    innerCol.style.textAlign = 'left';
                }
            } else {
                closeMenu();
            }
        });


        closeBtn.addEventListener('click', closeMenu);
    }



    const mainImg = document.querySelector('.gallery-main-img');
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const dots = document.querySelectorAll('.gallery-slider-dots .dot');
    const leftArrow = document.querySelector('.gallery-arrow-left');
    const rightArrow = document.querySelector('.gallery-arrow-right');


    if (mainImg && thumbnails.length > 0) {
        let currentIndex = 0;


        const images = Array.from(thumbnails).map(t => t.querySelector('img').src);


        const updateGallery = (index) => {

            if (index < 0) index = images.length - 1;
            if (index >= images.length) index = 0;
            currentIndex = index;


            mainImg.style.opacity = '0';


            setTimeout(() => {
                mainImg.src = images[currentIndex];
                mainImg.style.opacity = '1';
            }, 150);


            thumbnails.forEach(t => t.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));


            thumbnails[currentIndex % thumbnails.length]?.classList.add('active');
            dots[currentIndex % dots.length]?.classList.add('active');
        };


        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => updateGallery(index));
        });


        leftArrow?.addEventListener('click', () => updateGallery(currentIndex - 1));
        rightArrow?.addEventListener('click', () => updateGallery(currentIndex + 1));


        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {

                const targetIndex = Math.floor(index * (thumbnails.length / dots.length));
                updateGallery(targetIndex);
            });
        });


        mainImg.style.transition = 'opacity 0.15s ease-in-out';
    }



    const subscriptionRadios = document.querySelectorAll('input[name="subscription_type"]');
    const fragranceCards = document.querySelectorAll('.fragrance-card');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const planDetailsContainer = document.querySelector('.plan-details');


    let currentFragrance = 'Original';
    let currentSubscription = 'single';


    const setupSubscriptions = () => {
        subscriptionRadios.forEach(radio => {

            radio.addEventListener('change', (e) => {
                currentSubscription = e.target.value;
                updateAddToCartLink();


                const activePlan = e.target.closest('.subscription-plan');

                document.querySelectorAll('.subscription-plan').forEach(plan => {
                    plan.classList.remove('active-plan');
                });

                activePlan.classList.add('active-plan');
            });
        });


        document.querySelectorAll('.plan-header').forEach(header => {
            header.addEventListener('click', () => {
                const radio = header.querySelector('input[type="radio"]');

                if (radio && !radio.checked) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change'));
                }
            });
        });
    }


    const setupFragrances = () => {

        const allCards = document.querySelectorAll('.fragrance-card');
        allCards.forEach(card => {
            card.addEventListener('click', () => {

                const parentGroup = card.closest('.fragrance-options');
                if (parentGroup) {
                    parentGroup.querySelectorAll('.fragrance-card').forEach(c => c.classList.remove('active'));
                }
                card.classList.add('active');


                const nameNode = card.querySelector('.fragrance-name');
                if (nameNode) currentFragrance = nameNode.textContent.trim();


                updateAddToCartLink();
            });
        });
    }


    const updateAddToCartLink = () => {
        if (!addToCartBtn) return;


        const baseUrl = "https://example.com/cart";

        const productId = `${currentSubscription}-${currentFragrance.toLowerCase()}`;

        addToCartBtn.onclick = () => {
            window.location.href = `${baseUrl}?item=${productId}`;
        };

        console.log(`Cart variation updated to: ${productId}`);
    };


    setupSubscriptions();
    setupFragrances();
    updateAddToCartLink();




    const initCounters = () => {

        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');

                    const updateCount = () => {

                        const currentText = counter.innerText;
                        const count = +currentText.replace('%', '');
                        const inc = target / speed;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc) + '%';
                            setTimeout(updateCount, 10);
                        } else {
                            counter.innerText = target + '%';
                        }
                    };
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    };


    initCounters();


    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const parentItem = header.parentElement;
            const icon = header.querySelector('.accordion-icon');

            const isActive = parentItem.classList.contains('active');

            const plusSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="11" width="14" height="2" fill="#032E15"/><rect x="11" y="5" width="2" height="14" fill="#032E15"/></svg>`;
            const minusSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="11" width="14" height="2" fill="#032E15"/></svg>`;


            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-icon').innerHTML = plusSvg;
            });


            if (!isActive) {
                parentItem.classList.add('active');
                icon.innerHTML = minusSvg;
            }
        });
    });
});
