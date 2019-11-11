function hackyPathNormalizer(string) {
  const splitBySlash = string.split('/');
  const withoutSlash = splitBySlash[1] || splitBySlash[0];
  const splitByPeriod = withoutSlash.split('.');
  const withoutFileType = splitByPeriod[0];
  const splitByHashtag = withoutFileType.split('#');
  const withoutAnchor = splitByHashtag[0];
  console.log("normalized", withoutAnchor);
  return withoutAnchor;
}

function updateUrl(url) {
  window.history.pushState({}, '', url);
}

function hideOldContentAndMaybeShowPrefetchedNewContent(url) {
  let match = null;
  $(".content").each((index, el) => {
  console.log(`path:[${$(el).data('path')}] vs. url [${url}]`);
    if(hackyPathNormalizer($(el).data('path')) == hackyPathNormalizer(url)) {
     match = el;
     $(match).show();
     updateUrl(url);
    } else {
      $(el).hide();
    }
  });  
  return !!match;
}

function closeNavigationMenu() {
  $('.luxbar-checkbox').prop('checked', false);
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
  addNavigationClickInterceptors(content);
  updateUrl(url);
}

function scrollToAnchor(hash) {
  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate({
    scrollTop: $(hash).offset().top
  }, 800, function(){
   
  // Add hash (#) to URL when done scrolling (default click behavior)
  window.location.hash = hash;
  }); 
}

async function clientSideNavigate(url, hash) {
  const prefetched = hideOldContentAndMaybeShowPrefetchedNewContent(url);
  if (!prefetched) {
    await fetchAndDisplayNewContent(url);
  }
  if (hash) { 
    scrollToAnchor(hash);
  } else {
    $(window).scrollTop(0);
  }
  closeNavigationMenu();
}

function interceptClickEvent(e, anchor) {
  const href = anchor.getAttribute('href');

  if (location.hostname !== anchor.hostname) {
    return;
  }

  e.preventDefault();
  
  if (href && href.startsWith('#')) { 
    console.log("scrolling to local anchor");
    scrollToAnchor(href);
  }
  else if (location.hostname === anchor.hostname || 
	  !anchor.hostname.length) {
    clientSideNavigate(href, anchor.hash);      
  }
}

// By intercepting clicks with a valid href
// rather than doing nav completely client-side,
// we allow people to still right-click to open in new tab.
function addNavigationClickInterceptors(context) {
  $("a", context).on('click', function(evt) {
    interceptClickEvent(evt, this);
  });
}


export function init() {
  console.log("initing navigation");
  addNavigationClickInterceptors();
}
