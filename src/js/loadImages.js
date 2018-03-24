export default function loadFullImages() {
	const imageContainers = [].slice.call(document.querySelectorAll('.hero-pic__container'));
	imageContainers.forEach((imageContainer) => {
		loadFullImage(imageContainer);
	});

	function loadFullImage(item) {
		const img = new Image();
		img.srcset = item.dataset.srcset;
		img.sizes = item.dataset.sizes;
		img.src = item.dataset.src;
		img.alt = item.dataset.alt;
		img.className = ('reveal hero-pic__img');
		if (img.complete) {
			phaseInImg(item, img);
		} else {
			img.addEventListener('load', function fullImageLoaded() {
				phaseInImg(item, img);
				img.removeEventListener('load', fullImageLoaded);
			})
		}
	}

	function phaseInImg(item, img) {
		removePreviewFeatures(item);
		item
			.appendChild(img)
			.addEventListener('animationend', function phaseOutPreview(e) {
				let previewImage = item.querySelector('.hero-preview');
				item.removeChild(previewImage);
				e.target.classList.remove('reveal');
				e.target.removeEventListener('animationend', phaseOutPreview);
			})
	}

	function removePreviewFeatures(item) {
		item.classList.remove('replace');
		item.addEventListener('click', function(e) {
			e.preventDefault();
		})
	}
}
