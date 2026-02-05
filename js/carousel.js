 // Example tech logos using icon fonts or text
        const imageLogos = [
            { src: "media/youtubelogo.png", alt: "Company 1" },
            { src: "media/googlelogo.png", alt: "Company 2" },
            { src: "media/discordlogo.png", alt: "Company 3" },
            { src: "media/telegramlogo.png", alt: "Company 4" },
            { src: "media/slacklogo.png", alt: "Company 4" },
            { src: "media/facebooklogo.png", alt: "Company 4" },
            { src: "media/instagramlogo.jpeg", alt: "Company 4" },
            { src: "media/xlogo.png", alt: "Company 4" },
            { src: "media/linkedinlogo.png", alt: "Company 4" },
            { src: "media/tiktoklogo.png", alt: "Company 4" },
            { src: "media/threadlogo.png", alt: "Company 4" },
            { src: "media/pinlogo.png", alt: "Company 4" },
        ];
        


        // Initialize first loop with node/text logos
        new LogoLoop('#logoloop1', {
            logos: imageLogos,
            speed: 80,
            direction: 'left',
            logoHeight: 50,
            gap: 40,
            hoverSpeed: 0,
            scaleOnHover: true,
            fadeOut: true,
            fadeOutColor: '#000000',
            ariaLabel: 'Technology partners'
        });

        new LogoLoop('#logoloop2', {
           logos: imageLogos,
            speed: 80,
            direction: 'right',
            logoHeight: 50,
            gap: 40,
            hoverSpeed: 0,
            scaleOnHover: true,
            fadeOut: true,
            fadeOutColor: '#000000',
            ariaLabel: 'Technology partners'
        });

          new LogoLoop('#logoloop3', {
           logos: imageLogos,
            speed: 100,
            direction: 'left',
            logoHeight: 50,
            
            gap: 40,
            hoverSpeed: 0,
            scaleOnHover: true,
            fadeOut: true,
            fadeOutColor: '#000000',
            ariaLabel: 'Technology partners'
        });