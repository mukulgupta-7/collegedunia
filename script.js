// get data from json file

function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType('application/json');
	xobj.open('GET', 'colleges.json', true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == '200') {
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}

function init() {
	loadJSON(function(response) {
		var actual_JSON = JSON.parse(response);

		console.log(list);
		generateList(actual_JSON, list);
		while (true) {
			let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

			if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
				// let's add more data
				document.body.insertAdjacentHTML('beforeend', `<p>Date: ${new Date()}</p>`);
			}
		}
		// generate list
	});
}

// initialization

init();
let list = document.getElementById('list');
list.addEventListener('scroll', function() {
	console.log('hi');
	if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
		generateList(actual_JSON, list);
	}
	console.log('triggered');
});

function generateList(colleges, list) {
	console.log(colleges);
	let str = '';
	let i = 0;
	for (let data of colleges.colleges) {
		i++;
		if (i > 10) {
			break;
		}
		console.log(i);
		console.log(data);
		let idx = Math.floor(Math.random() * 2) + 1;
		let stars = '&#x2605;'.repeat(data.rating);
		let light = '&#x2605;'.repeat(5 - data.rating);
		console.log(stars);
		let count = 0;
		str += `<div class="contain">
		<div class="gradient">
			<img src="./college_0${idx}.jpg" alt="college">
		</div>
		<div class="padding">
			<div class="flex">
				<div>
					<div class="flex">
						<h5>${data.college_name}</h5>
						<p>${stars}<span class="light-big">${light}</span></p>
					</div>
					<h5>${data.nearest_place.map((loc) => {
						count++;
						return count % 2 != 0 ? loc : `<span class='light'> | ${loc}</span>`;
					})}</h5>
				</div>
				<div class="flex column">
					<div class="flex center">
						<p class="light cross">${data.original_fees}</p>
						<p class="red-label">${data.discount}</p>
					</div>
					<h4>${data.discounted_fees}</h4>
					<p>${data.fees_cycle}</p>
				</div>
			</div>
			<div class="flex">
				<h5><span class="green">93% Match:${data.famous_nearest_places.split(',').map((loc) => {
					return `<span class='light'> | ${loc}</span>`;
				})}</h5>
			</div>
			<div class="flex footer">
				<p class="footer-bar">Flat Rs<span class="green">2,000</span> off + upto Rs <span class="green"> 500 </span>wallet! to avail... <span class="blue">LOGIN</span> </p>
				<h5 class="green">
					${data.amenties[0]} &#183; ${data.amenties[1]}
				</h5>
			</div>
			<div class="promoted">
				${data.promoted ? `<h4 class="promote">Promoted</h4>` : ''}
			</div>
		</div>

		<div class="rating"><span>${data.rating}</span> / 5 <h6>${data.rating_remarks}</h6></div>
		<div class="tags flex">${data.tags.map((tag) => `<p class="tag">${tag}</p>`)}</div>
		</div>`;
	}
	list.innerHTML = str;
}