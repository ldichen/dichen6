// Table of Contents functionality
function initTableOfContents() {
	const article = document.querySelector("article");
	const tocList = document.getElementById("toc-list");

	if (!article || !tocList) return;

	// Get all headings from the article
	const headings = article.querySelectorAll("h2, h3, h4, h5, h6");

	if (headings.length === 0) {
		// Hide TOC if no headings
		const tocSidebar = document.getElementById("toc-sidebar");
		if (tocSidebar) {
			tocSidebar.style.display = "none";
		}
		return;
	}

	// Generate IDs for headings if they don't have one
	headings.forEach((heading, index) => {
		if (!heading.id) {
			const text = heading.textContent || "";
			const id =
				text
					.toLowerCase()
					.replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
					.replace(/^-|-$/g, "") || `heading-${index}`;
			heading.id = id;
		}
	});

	// Build TOC
	const tocItems = Array.from(headings).map((heading) => {
		const level = heading.tagName.toLowerCase().replace("h", "");
		const text = heading.textContent || "";
		const id = heading.id;

		return `
			<li>
				<a href="#${id}" data-level="${level}" data-target="${id}">
					${text}
				</a>
			</li>
		`;
	});

	tocList.innerHTML = tocItems.join("");

	// Smooth scroll on click
	const tocLinks = tocList.querySelectorAll("a");
	tocLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const targetId = link.getAttribute("data-target");
			const targetElement = document.getElementById(targetId);
			if (targetElement) {
				const offset = 100; // Offset from top
				const elementPosition = targetElement.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - offset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		});
	});

	// Highlight current section on scroll
	let ticking = false;
	function updateActiveLink() {
		const scrollPosition = window.scrollY + 150;

		let currentHeading = null;
		headings.forEach((heading) => {
			const headingTop = heading.offsetTop;
			if (scrollPosition >= headingTop) {
				currentHeading = heading;
			}
		});

		// Remove all active classes
		tocLinks.forEach((link) => link.classList.remove("active"));

		// Add active class to current section
		if (currentHeading) {
			const activeLink = tocList.querySelector(
				`a[data-target="${currentHeading.id}"]`
			);
			if (activeLink) {
				activeLink.classList.add("active");

				// Scroll TOC to keep active item visible
				const tocSidebar = document.getElementById("toc-sidebar");
				if (tocSidebar) {
					const linkRect = activeLink.getBoundingClientRect();
					const sidebarRect = tocSidebar.getBoundingClientRect();

					if (
						linkRect.top < sidebarRect.top ||
						linkRect.bottom > sidebarRect.bottom
					) {
						activeLink.scrollIntoView({
							block: "nearest",
							behavior: "smooth",
						});
					}
				}
			}
		}

		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				updateActiveLink();
				ticking = false;
			});
			ticking = true;
		}
	}

	window.addEventListener("scroll", onScroll);
	updateActiveLink(); // Initial update
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initTableOfContents);
} else {
	initTableOfContents();
}
