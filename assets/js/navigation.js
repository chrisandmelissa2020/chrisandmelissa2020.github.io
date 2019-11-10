function hackyPathNormalizer(string) {
  const splitBySlash = string.split('/');
  const withoutSlash = splitBySlash[1] || splitBySlash[0];
  const splitByPeriod = withoutSlash.split('.');
  const withoutFileType = splitByPeriod[0];
  console.log("normalized", withoutFileType);
  return withoutFileType;
}


function hideOldContentAndMaybeShowPrefetchedNewContent(url) {
  let match = null;
  $(".content").each((index, el) => {
  console.log(`path:[${$(el).data('path')}] vs. url [${url}]`);
    if(hackyPathNormalizer($(el).data('path')) == hackyPathNormalizer(url)) {
     match = el;
     $(match).show();
    } else {
      $(el).hide();
    }
  });  
  return !!match;
}

async function fetchAndDisplayNewContent(url) {
  const response = await fetch(url);
  const str = await response.clone().text();
  console.log("str", str);
  const dom = $.parseHTML($.trim(str), document);
  var tempdom = $('<output>').append(dom);
  console.log("dom", tempdom);
  console.log("typeof", typeof tempdom);
  var content = $('.content', tempdom);
  $('main').prepend(content);
}

function interceptClickEvent(e) {
  var href;
  var target = e.target || e.srcElement;
  if (target.tagName === 'A') {
    href = target.getAttribute('href');
    var hostname = target.hostname;
    if (location.hostname === hostname || !hostname.length) {
      if (true) { // TODO: Account for right clicks.
        e.preventDefault();
	const prefetched = hideOldContentAndMaybeShowPrefetchedNewContent(href);
	if (!prefetched) {
	  fetchAndDisplayNewContent(href);
	}
      }
    }
  }
}

// By intercepting clicks with a valid href
// rather than doing nav completely client-side,
// we allow people to still right-click to open in new tab.
function addNavigationClickInterceptors() {
  //listen for link click events at the document level
  if (document.addEventListener) {
    document.addEventListener('click', interceptClickEvent);
  } else if (document.attachEvent) {
    document.attachEvent('onclick', interceptClickEvent);
  }
}


export function init() {
  console.log("initing navigation");
  addNavigationClickInterceptors();
}
