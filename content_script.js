walk(document.body);


function walk(node)
{
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function getBlackListed(){
	
	var blackListed = ["james88od@gmail.com", "gregbrimble26@gmail.com"]
	return blackListed
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
		return xmlHttp.responseText;
}

function validateEmail(email) {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    validEmail = re.test(email)
    if(validEmail){
    	if(getBlackListed().indexOf(email) > -1){
    		return false
    	}
    	return validEmail
    }
}

function handleText(textNode)
{
	var v = textNode.nodeValue;

	if(validateEmail(v)){
		alert(v);
		datatooltipcontent = document.createAttribute("data-tooltip-content");
		datatooltipcontent.value = "#email";
		textNode.parentNode.setAttributeNode(datatooltipcontent);
		jQuery(textNode.parentNode).addClass('tooltip');

		templates = document.createElement('div');
		jQuery(templates).addClass('tooltip_templates');
		emailtemplate = document.createElement('div');
		emailtemplate.innerHTML = httpGet("https://c4a6f2a7.ngrok.io/lookup_by_email?email=" + v);
		emailtemplate.id = "email";

		templates.appendChild(emailtemplate);
		document.body.appendChild(templates);

		$('.tooltip').tooltipster();
	}

	v = v.replace(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "BUTT");
}
