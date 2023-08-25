import Sortable from '/javascripts/sortable.core.esm.js';
			
let list = document.querySelector('div');
let sort = Sortable.create(list);

let convertButton = document.querySelector('a.convert');
convertButton.onclick = function(){
	let images = document.querySelectorAll('img');
	let loader = document.querySelector('span.loader');
	let convertText = document.querySelector('span.text');
	let downloadButton = document.querySelector('a.download');
	
	let filenames = [];
	
	for(let image of images){
		filenames.push(image.dataset.name)
	}
	//activate loading animation
	loader.style.display = 'inline-block';
	convertText.style.display = 'none'
	
	//send the filenames to the server and receive the pdf link
	fetch('/pdf', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(filenames)
	})
	.then( (resp)=> {
		return resp.text()
	})
	.then( (data) => {
		loader.style.display = 'none';
		
		convertText.style.display = 'inline-block'
		downloadButton.style.display = 'inline-block'
		
		downloadButton.href = data
	})
	.catch( (error) => {
		console.error(error.message)
	})
	
}