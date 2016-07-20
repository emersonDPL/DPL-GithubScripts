"use strict";

function endsWith(str, suffix)
{
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

//Add the headers exactly as they appear in the google doc	
function picturize(nStr) 
{
	var pup = '<img src="https://p6.zdassets.com/hc/theme_assets/1008146/200250647/x.png" alt="Available" style="width:20px; height:20px;">';

	if (nStr.endsWith("?") === true)
		return pup;
	
	if (nStr.startsWith("#") === true)
		return pup;

	switch (nStr)
	{
		case "": 
			return '-';
			break;
		case "X": 
			return pup;
			break;
		case "AE": 
			return '<img src="//p6.zdassets.com/hc/theme_assets/1008146/200250647/ae.png" alt="After Effects Plugin" style="width:20px; height:20px;">';
			break;
		case "Maya": 
			return '<img src="//p6.zdassets.com/hc/theme_assets/1008146/200250647/Maya.png" alt="Maya Plugin" style="width:20px; height:20px;">';
			break;
		case "PS": 
			return '<img src="//p6.zdassets.com/hc/theme_assets/1008146/200250647/PS.png" alt="Photoshop Add-On" style="width:20px; height:20px;">';
			break;
		default: 
			return nStr;
			break;
	}
}

function displayDigital(json) 
{	
	var pre_html = '<table class="tableSection"><thead>';
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
	var pre_html = '<table class="tableSection"><thead>';
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
	var pre_html = '<table class="tableSection"><thead>';
	for (var y = 0; y<AudioHeaders.length; y++)
	{
		pre_html += [ "<th>"+AudioHeaders[y].toString()+"</th>" ].join('');
	}
	pre_html += ['</thead><tbody id="swlist"><tr>'].join('');
	var actual_html='';
	var post_html = '</tr></tbody></table>';
	var len = json.feed.entry.length;
		for (var i=0; i<len; i++) 
		{
		actual_html+=['<tr>'].join('');
		for (var j = 0; j<AudioHeaders.length; j++)
		{
			var curHeader=AudioHeaders[j].toString().toLowerCase().replace(" ", "");
		actual_html+=[	
			'<td>', 
			picturize(json.feed.entry[i]["gsx$"+curHeader]["$t"]), 
			'</td>',
		].join(''); 
		}
		actual_html+=['</tr>'].join('');
	}
	document.getElementById(audioDiv).innerHTML += pre_html + actual_html + post_html;
}
