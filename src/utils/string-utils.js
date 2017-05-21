export function humanize(string) {
  string = string || '';
  string = string.toString(); // might be a number
  string = string.trim();
  string = string.replace(/[\W_]+/g, ' ');

  return titleCase(string);
}

export function titleCase(string) {
  return string.split(' ').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

export function removeHTMLTag(tag) {
  var ele = document.createElement('ele');
  ele.innerHTML = tag;
  return ele.textContent;
}

export function renderBodyToHtml(htmlString) {
  return {__html: htmlString}
}

export function randomHashString(string, hashRange) {
  let code = string.charCodeAt(0) + string.charCodeAt(string.length - 1);
  return code % hashRange;
}
