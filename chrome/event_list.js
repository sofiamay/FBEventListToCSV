/* ------Sender: BACKGROUND (events.js) ------ */

/* -- Receiver: POPUP (popup.js) --*/
{
	status:"scraping_start_success",
	receiver:"popup"
}

{
	status:"scraping_start_fail",receiver:"popup"
}

{
	status:"scraping_done",
	receiver:"popup",
	data:data
}

{
	status:"scraping_ongoing",
	receiver:"popup",
	data:data
}

{
	status:"unknown",
	receiver:"popup"
}

{
	status:"scraping_done",
	receiver:"popup",
	data:data
}

/* -- Receiver: FORWARDING (request.destination) --*/
{
	status:request.type,
	receiver:request.destination,
	data:data
}

/* -- Receiver: FACEBOOK TAB ON BROWSER (request.destination) --*/
{
	action: request.action,
	data:request
}

{
	action: "clean",
	data:request
}

/* ------Sender: CONTENT.JS ------ */

/* -- Receiver: BACKGROUND --*/

{
	sender: "content_canvas",
	receiver: "background", // we don't want content to directly pick it up as events has to do certain adjustments to this data
	destination: "popup",
	type: "file",
	title: file,
	link: download_link
}

{
	sender: "content_canvas",
	receiver: "background", // we don't want content to directly pick it up as events has to do certain adjustments to this data
	destination: "popup",
	type: "batch",
	download: download
}

/* ------Sender: POPUP.JS ------ */

/* -- Receiver: BACKGROUND --*/
{
	sender: "popup",
	receiver: "background",
	destination: "content_".concat(webpage),	// it will go to content via events
	action: "scrape",
	tab: currentTab,
}

{
	sender: "popup",
	receiver: "background",
	destination: "background",
	action: "check_status",
	tab: currentTab,
}

{
	sender: "popup",
	receiver: "background",
	destination: "background",
	action: "reload",
	webpage: webpage,
	tab: currentTab,
}
