const phantom = require('phantom');

const tagRE = new RegExp('<(?=.*? .*?\/ ?>|br|hr|input|img|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>');
const urlOrIpRE = new RegExp('((https|http)\\:\\/\\/)?((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):?(\\d{1,5})|([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+)(\\/(\\S*))?','i');

const self = module.exports = {
  loadURL: (url) => {
    if(!url) return;
    console.log('accessing: ', url);
    const pageload = phantom
      .create()
      .then(ph => {
        _ph = ph;
        return _ph.createPage();
      })
      .then(page => {
        _page = page;
        return _page.open(url);
      })
      .then(status => {

        //clean up
        _page.close().then(()=>{
          _ph.exit();
        });
        return status;
      })
      .catch(e => console.log(e));

    return pageload;
  },
  formatURL: (url) => {
    if(url.indexOf('http://')===0 || url.indexOf('https://')===0){
      return url;
    }
    return `http://${url}`;
  },
  verifyURLFormatFromQuery: query => urlOrIpRE.test(query),
  extractURLFormatFromQuery: (query) => {
    let url = query.match(urlOrIpRE)[0];
    return self.formatURL(url);
  },
  hasTagsInQuery: query => tagRE.test(query)
}