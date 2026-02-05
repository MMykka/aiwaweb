class LogoLoop {
    constructor(selector, options = {}) {
        this.container = typeof selector === 'string' 
            ? document.querySelector(selector) 
            : selector;
        
        if (!this.container) {
            console.error('LogoLoop: Container not found');
            return;
        }

        // Configuration
        this.ANIMATION_CONFIG = { 
            SMOOTH_TAU: 0.25, 
            MIN_COPIES: 2, 
            COPY_HEADROOM: 2 
        };

        // Options with defaults
        this.logos = options.logos || [];
        this.speed = options.speed !== undefined ? options.speed : 120;
        this.direction = options.direction || 'left';
        this.width = options.width || '100%';
        this.logoHeight = options.logoHeight || 28;
        this.gap = options.gap || 32;
        this.pauseOnHover = options.pauseOnHover;
        this.hoverSpeed = options.hoverSpeed;
        this.fadeOut = options.fadeOut || false;
        this.fadeOutColor = options.fadeOutColor;
        this.scaleOnHover = options.scaleOnHover || false;
        this.renderItem = options.renderItem;
        this.ariaLabel = options.ariaLabel || 'Partner logos';
        this.className = options.className || '';
        this.customStyle = options.style || {};

        // State
        this.seqWidth = 0;
        this.seqHeight = 0;
        this.copyCount = this.ANIMATION_CONFIG.MIN_COPIES;
        this.isHovered = false;

        // Animation refs
        this.rafId = null;
        this.lastTimestamp = null;
        this.offset = 0;
        this.velocity = 0;

        // DOM refs
        this.containerEl = null;
        this.trackEl = null;
        this.seqEl = null;

        this.init();
    }

    get isVertical() {
        return this.direction === 'up' || this.direction === 'down';
    }

    get targetVelocity() {
        const magnitude = Math.abs(this.speed);
        let directionMultiplier;
        if (this.isVertical) {
            directionMultiplier = this.direction === 'up' ? 1 : -1;
        } else {
            directionMultiplier = this.direction === 'left' ? 1 : -1;
        }
        const speedMultiplier = this.speed < 0 ? -1 : 1;
        return magnitude * directionMultiplier * speedMultiplier;
    }

    get effectiveHoverSpeed() {
        if (this.hoverSpeed !== undefined) return this.hoverSpeed;
        if (this.pauseOnHover === true) return 0;
        if (this.pauseOnHover === false) return undefined;
        return 0;
    }

    init() {
        this.createStructure();
        this.setupResizeObserver();
        this.loadImages();
    }

    createStructure() {
        // Create container
        this.containerEl = document.createElement('div');
        this.containerEl.className = this.getContainerClasses();
        this.containerEl.setAttribute('role', 'region');
        this.containerEl.setAttribute('aria-label', this.ariaLabel);
        
        // Apply styles
        this.applyContainerStyles();

        // Create track
        this.trackEl = document.createElement('div');
        this.trackEl.className = 'logoloop__track';
        
        // Event listeners
        if (this.effectiveHoverSpeed !== undefined) {
            this.trackEl.addEventListener('mouseenter', () => this.handleMouseEnter());
            this.trackEl.addEventListener('mouseleave', () => this.handleMouseLeave());
        }

        // Create logo lists
        this.createLogoLists();

        this.containerEl.appendChild(this.trackEl);
        this.container.appendChild(this.containerEl);
    }

    getContainerClasses() {
        const classes = ['logoloop'];
        
        if (this.isVertical) {
            classes.push('logoloop--vertical');
        } else {
            classes.push('logoloop--horizontal');
        }
        
        if (this.fadeOut) {
            classes.push('logoloop--fade');
        }
        
        if (this.scaleOnHover) {
            classes.push('logoloop--scale-hover');
        }
        
        if (this.className) {
            classes.push(this.className);
        }
        
        return classes.join(' ');
    }

    applyContainerStyles() {
        const styles = {
            '--logoloop-gap': `${this.gap}px`,
            '--logoloop-logoHeight': `${this.logoHeight}px`,
        };

        if (this.fadeOutColor) {
            styles['--logoloop-fadeColor'] = this.fadeOutColor;
        }

        if (!this.isVertical || this.width !== '100%') {
            this.containerEl.style.width = typeof this.width === 'number' 
                ? `${this.width}px` 
                : this.width;
        }

        Object.entries(styles).forEach(([key, value]) => {
            this.containerEl.style.setProperty(key, value);
        });

        Object.entries(this.customStyle).forEach(([key, value]) => {
            this.containerEl.style[key] = value;
        });
    }

    createLogoLists() {
        for (let copyIndex = 0; copyIndex < this.copyCount; copyIndex++) {
            const list = this.createLogoList(copyIndex);
            this.trackEl.appendChild(list);
            
            if (copyIndex === 0) {
                this.seqEl = list;
            }
        }
    }

    createLogoList(copyIndex) {
        const list = document.createElement('ul');
        list.className = 'logoloop__list';
        list.setAttribute('role', 'list');
        
        if (copyIndex > 0) {
            list.setAttribute('aria-hidden', 'true');
        }

        this.logos.forEach((item, itemIndex) => {
            const listItem = this.createLogoItem(item, `${copyIndex}-${itemIndex}`);
            list.appendChild(listItem);
        });

        return list;
    }

    createLogoItem(item, key) {
        const li = document.createElement('li');
        li.className = 'logoloop__item';
        li.setAttribute('role', 'listitem');

        if (this.renderItem) {
            li.innerHTML = this.renderItem(item, key);
            return li;
        }

        const isNodeItem = 'node' in item;
        let content;

        if (isNodeItem) {
            const span = document.createElement('span');
            span.className = 'logoloop__node';
            if (item.href && !item.ariaLabel) {
                span.setAttribute('aria-hidden', 'true');
            }
            span.textContent = item.node;
            content = span;
        } else {
            const img = document.createElement('img');
            img.src = item.src;
            if (item.srcSet) img.srcset = item.srcSet;
            if (item.sizes) img.sizes = item.sizes;
            if (item.width) img.width = item.width;
            if (item.height) img.height = item.height;
            img.alt = item.alt || '';
            if (item.title) img.title = item.title;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.draggable = false;
            content = img;
        }

        if (item.href) {
            const link = document.createElement('a');
            link.className = 'logoloop__link';
            link.href = item.href;
            const itemAriaLabel = isNodeItem 
                ? (item.ariaLabel || item.title) 
                : (item.alt || item.title);
            link.setAttribute('aria-label', itemAriaLabel || 'logo link');
            link.target = '_blank';
            link.rel = 'noreferrer noopener';
            link.appendChild(content);
            li.appendChild(link);
        } else {
            li.appendChild(content);
        }

        return li;
    }

    setupResizeObserver() {
        if (window.ResizeObserver) {
            this.resizeObserver = new ResizeObserver(() => this.updateDimensions());
            this.resizeObserver.observe(this.containerEl);
            if (this.seqEl) {
                this.resizeObserver.observe(this.seqEl);
            }
        } else {
            window.addEventListener('resize', () => this.updateDimensions());
        }
        
        this.updateDimensions();
    }

    loadImages() {
        const images = this.seqEl?.querySelectorAll('img') || [];
        
        if (images.length === 0) {
            this.updateDimensions();
            return;
        }

        let remainingImages = images.length;
        
        const handleImageLoad = () => {
            remainingImages--;
            if (remainingImages === 0) {
                this.updateDimensions();
            }
        };

        images.forEach(img => {
            if (img.complete) {
                handleImageLoad();
            } else {
                img.addEventListener('load', handleImageLoad, { once: true });
                img.addEventListener('error', handleImageLoad, { once: true });
            }
        });
    }

    updateDimensions() {
        const containerWidth = this.containerEl?.clientWidth || 0;
        const sequenceRect = this.seqEl?.getBoundingClientRect();
        const sequenceWidth = sequenceRect?.width || 0;
        const sequenceHeight = sequenceRect?.height || 0;

        if (this.isVertical) {
            const parentHeight = this.containerEl?.parentElement?.clientHeight || 0;
            if (this.containerEl && parentHeight > 0) {
                const targetHeight = Math.ceil(parentHeight);
                this.containerEl.style.height = `${targetHeight}px`;
            }

            if (sequenceHeight > 0) {
                this.seqHeight = Math.ceil(sequenceHeight);
                const viewport = this.containerEl?.clientHeight || parentHeight || sequenceHeight;
                const copiesNeeded = Math.ceil(viewport / sequenceHeight) + this.ANIMATION_CONFIG.COPY_HEADROOM;
                this.updateCopyCount(Math.max(this.ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
            }
        } else if (sequenceWidth > 0) {
            this.seqWidth = Math.ceil(sequenceWidth);
            const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + this.ANIMATION_CONFIG.COPY_HEADROOM;
            this.updateCopyCount(Math.max(this.ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }

        this.startAnimation();
    }

    updateCopyCount(newCount) {
        if (newCount === this.copyCount) return;
        
        const currentCount = this.trackEl.children.length;
        
        if (newCount > currentCount) {
            for (let i = currentCount; i < newCount; i++) {
                const list = this.createLogoList(i);
                this.trackEl.appendChild(list);
            }
        } else if (newCount < currentCount) {
            while (this.trackEl.children.length > newCount) {
                this.trackEl.removeChild(this.trackEl.lastChild);
            }
        }
        
        this.copyCount = newCount;
    }

    handleMouseEnter() {
        this.isHovered = true;
    }

    handleMouseLeave() {
        this.isHovered = false;
    }

    startAnimation() {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
        }

        const seqSize = this.isVertical ? this.seqHeight : this.seqWidth;

        if (seqSize > 0) {
            this.offset = ((this.offset % seqSize) + seqSize) % seqSize;
            this.applyTransform();
        }

        const animate = (timestamp) => {
            if (this.lastTimestamp === null) {
                this.lastTimestamp = timestamp;
            }

            const deltaTime = Math.max(0, timestamp - this.lastTimestamp) / 1000;
            this.lastTimestamp = timestamp;

            const target = this.isHovered && this.effectiveHoverSpeed !== undefined 
                ? this.effectiveHoverSpeed 
                : this.targetVelocity;

            const easingFactor = 1 - Math.exp(-deltaTime / this.ANIMATION_CONFIG.SMOOTH_TAU);
            this.velocity += (target - this.velocity) * easingFactor;

            if (seqSize > 0) {
                let nextOffset = this.offset + this.velocity * deltaTime;
                nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
                this.offset = nextOffset;
                this.applyTransform();
            }

            this.rafId = requestAnimationFrame(animate);
        };

        this.rafId = requestAnimationFrame(animate);
    }

    applyTransform() {
        if (!this.trackEl) return;
        
        const transformValue = this.isVertical
            ? `translate3d(0, ${-this.offset}px, 0)`
            : `translate3d(${-this.offset}px, 0, 0)`;
        this.trackEl.style.transform = transformValue;
    }

    destroy() {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }

        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        if (this.containerEl && this.containerEl.parentElement) {
            this.containerEl.parentElement.removeChild(this.containerEl);
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LogoLoop;
}