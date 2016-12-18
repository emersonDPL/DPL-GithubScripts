"use strict";

// ==============================================
// =============IMPORT GOOGLE SHEETS=============
// ==============================================

function endsWith(str, suffix)
{
	/* This function returns the last letter of a string.
	This is used for checking if a cell ends with a ?
	That way you can ask questions in the Google Sheet without changing the output on the live site
	*/

    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function picturize(nStr) 
{
	/* This function replaces the contents of a cell from the google sheet with the appropriate line of code. 
	Most of the time it returns the puppy. Though other cases are defined as well
	*/
	
	var pup = '<img src="https://p6.zdassets.com/hc/theme_assets/1008146/200250647/x.png" alt="Available" style="width:20px; height:20px;">';
	// Set up vairable pup
	// This makes it easy to give the default image, which is the puppy

	if (nStr.endsWith("?") === true)
		return pup;
	
	if (nStr.startsWith("#") === true)
		return pup;

	/* for each case, the algorithm checks if it matches any of the following phrases.
	If it matches a phrase, it will return the assocated string or variable.
	You can add any cases you need here, and you can use them in the google sheet.
	Example, we added the "Avid" case, and set it up to return the string to show an avid icon.
	*/

	switch (nStr)
	{
		case "": // If the Cell is empty, show a hyphen
			return '-';
			break;
		case "X": // If the Cell is "X", show the puppy
			return pup;
			break; 
		case "AE": // If the Cell is "AE", show the After Effects Icon
			return '<img src="//p6.zdassets.com/hc/theme_assets/1008146/200250647/AE.png" alt="After Effects Plugin" style="width:20px; height:20px;">';
			break;
		case "Maya": // If the Cell is "Maya" show the Maya Icon
			return '<img src="//p6.zdassets.com/hc/theme_assets/1008146/200250647/maya_nonAnimating.png" alt="Maya Plugin" style="width:20px; height:20px;">';
			break;
		case "PS":  // If the Cell is "PS" show the Photoshop Icon
			return '<img src="//p6.zdassets.com/hc/theme_assets/1008146/200250647/PS.png" alt="Photoshop Add-On" style="width:20px; height:20px;">';
			break;
		case "Avid": // If the Cell is "Avid" show the Avid Icon
			return '<img src="//p6.zdassets.com/hc/theme_assets/1008146/200250647/avid.png" alt="Avid Plugin" style="width:20px; height:20px;">';
			break;
		default: // If the cell doesn't match any of the above cases, just display what the cell says.
			return nStr;
			break;
	}
}


/* 
The Following 3 functions are nearly identical, though slight differences are because I have them all targeting different divs.
I have them split into 3 different functions, since it is easy to just do a callback for what you need.
Also I wasn't able to figure out how to pass a second variable to a callback.
If you can figure that out, it could simplify these, since you wouldn't need 3 separate functions, you could just point it at different thigns based on the input variable.
*/

function displayDigital(json) 
{

	var pre_html = '<table class="tableSection table table-striped"><thead>';
	for (var y = 0; y<digitalHeaders.length; y++)
	{
		pre_html += [ "<th>"+digitalHeaders[y].toString()+"</th>" ].join('');
	}
	pre_html += ['</thead><tbody id="swlist"><tr>'].join('');
	
	var actual_html='';
	
	var post_html = '</tr></tbody></table>';
	
	var len = json.feed.entry.length;
	
	for (var i=0; i<len; i++) 
	{
		if (json.feed.entry[i]["gsx$status"]["$t"] !== "dead")
		{
			actual_html+=['<tr>'].join('');
			
			for (var j = 0; j<digitalHeaders.length; j++)
			{
				var curHeader=digitalHeaders[j].toString().toLowerCase().replace(" ", "");			
				actual_html+=[	
				'<td>', 
				picturize(json.feed.entry[i]["gsx$"+curHeader]["$t"]), 
				'</td>',
				].join(''); 
			}
			actual_html+=['</tr>'].join('');
		}
	}
	document.getElementById(digitalDiv).innerHTML += pre_html + actual_html + post_html;
}  

function displayFilm(json) 
{	
	var pre_html = '<table class="tableSection table table-striped"><thead>';
	for (var y = 0; y<filmHeaders.length; y++)
	{
		pre_html += [ "<th>"+filmHeaders[y].toString()+"</th>" ].join('');
	}
	pre_html += ['</thead><tbody id="swlist"><tr>'].join('');
	
	var actual_html='';
	
	var post_html = '</tr></tbody></table>';
	
	var len = json.feed.entry.length;
	
	for (var i=0; i<len; i++) 
	{
		actual_html+=['<tr>'].join('');
		if (json.feed.entry[i]["gsx$status"]["$t"] !== "dead")
		{
			for (var j = 0; j<filmHeaders.length; j++)
			{
				var curHeader=filmHeaders[j].toString().toLowerCase().replace(" ", "");
				actual_html+=[	
				'<td>', 
				picturize(json.feed.entry[i]["gsx$"+curHeader]["$t"]), 
				'</td>',
				].join(''); 
			}
			actual_html+=['</tr>'].join('');
		}
	}
	document.getElementById(filmDiv).innerHTML += pre_html + actual_html + post_html;
}

function displayAudio(json) 
{

	var pre_html = '<table class="tableSection table table-striped"><thead>';
	for (var y = 0; y<audioHeaders.length; y++)
	{
		pre_html += [ "<th>"+audioHeaders[y].toString()+"</th>" ].join('');
	}
	pre_html += ['</thead><tbody id="swlist"><tr>'].join('');
	
	var actual_html='';
	
	var post_html = '</tr></tbody></table>';
	
	var len = json.feed.entry.length;
	
	for (var i=0; i<len; i++) 
	{
		if (json.feed.entry[i]["gsx$status"]["$t"] !== "dead")
		{
			actual_html+=['<tr>'].join('');
			
			for (var j = 0; j<audioHeaders.length; j++)
			{
				var curAudHeader=audioHeaders[j].toString().toLowerCase().replace(" ", "");			
				actual_html+=[	
				'<td>', 
				picturize(json.feed.entry[i]["gsx$"+curAudHeader]["$t"]), 
				'</td>',
				].join(''); 
			}
			actual_html+=['</tr>'].join('');
		}
	}
	document.getElementById(audioDiv).innerHTML += pre_html + actual_html + post_html;
}  
