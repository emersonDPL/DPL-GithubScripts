"use strict";

// ==============================================
// =============IMPORT GOOGLE SHEETS=============
// ==============================================

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
			return '<img src="//p6.zdassets.com/hc/theme_assets/1008146/200250647/AE.png" alt="After Effects Plugin" style="width:20px; height:20px;">';
			break;
		case "Maya": 
			return '<img src="//p6.zdassets.com/hc/theme_assets/1008146/200250647/maya.png" alt="Maya Plugin" style="width:20px; height:20px;">';
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

// =============================================
// ==========REGEX SEARCH SPREADSHEETS==========
// =============================================

$('#nosw').hide();

$( document ).ready(function() {
	$('#swload1').remove();
	$('#swload2').remove();
	$('#swload3').remove();

	var $rows = $('#swlist tr');
	$('#search').keyup(function() {
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
		reg = RegExp(val, 'i'),
		text;
		$rows.show().filter(function() {
			text = $(this).text().replace(/\s+/g, ' ');
			return !reg.test(text);
		}).hide();
	
	var numTR = $('#swlist').find('tr').length;
	var numHide = $('#swlist').find('tr:hidden').length;
	
	if (numTR === numHide) {
		console.log("all cells hidden");
		$('#nosw').show();
	} else {
		console.log("some cells are visible");
		$('#nosw').hide();
	}
	});
});

// =============================================
// =================TABBED DIVS=================
// =============================================

$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});

});