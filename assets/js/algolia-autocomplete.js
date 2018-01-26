/* global instantsearch autocomplete */

var appID = 'Y63Q32NVDL',
    apiKey = '45bce7c03e206c4f2618e69a9f6acfc1',
    articlesIndexName = 'ABC_TEST_coremedia_article',
    iviewIndexName = 'ABC_TEST_iview',
    radioIndexName = 'ABC_TEST_coremedia_audio',
    tvIndexName = 'ABC_TEST_coremedia_video',

    client = algoliasearch(appID, apiKey),

    articlesIndex = client.initIndex(articlesIndexName),
    iviewIndex = client.initIndex(iviewIndexName),
    radioIndex = client.initIndex(radioIndexName),
    tvIndex = client.initIndex(tvIndexName);

autocomplete('#aa-search-input', {
    debug: true,
    hint: true,
    templates: {
        dropdownMenu: '<div class="left-wrapper"><div class="aa-dataset-news"></div><div class="aa-dataset-radio"></div></div>' +
            '<div class="right-wrapper"><div class="aa-dataset-iview"></div><div class="aa-dataset-tv"></div></div>'
    }
}, [{
        source: autocomplete.sources.hits(articlesIndex, {
            hitsPerPage: 5,
            //filter: "lang:en"
        }),
        displayKey: 'title_t',
        name: 'news',
        templates: {
            header: '<div id="aa-news-header" class="aa-suggestions-category"><img id="news" src="/homepage/2013/styles/img/news-logo.png" ></div>',
            //'suggestion' templating function used to render a single suggestion
            suggestion: function (suggestion) {
                return '<a href="'+
                suggestion.canonicalURL +
                '"><div class="aa-title-wrapper"><span>' + suggestion._highlightResult.title.value + '</span></div></a>'
            },
            empty: '<div class="aa-empty">No matching ABC articles.</div>'
        }
    },
    {
        source: autocomplete.sources.hits(radioIndex, {
            hitsPerPage: 2
        }),
        displayKey: 'title_t',
        name: 'radio',
        templates: {
            //'suggestion' templating function used to render a single suggestion
            header: '<div id="aa-radio-header" class="aa-suggestions-category"><img src="/homepage/2013/styles/img/radio-logo.png" style="height: 40px;"></div>',
            suggestion: function (suggestion) {
                return '<a href="'+
                suggestion.canonicalURL +
                '"><div class="aa-radio-wrapper"><div id="audio-play"></div><span>' + suggestion._highlightResult.title.value + '</span></div></a>'
            },
            empty: '<div class="aa-empty">No matching ABC audio.</div>'
        }
    },
    {
        source: autocomplete.sources.hits(iviewIndex, {
            hitsPerPage: 3
        }),
        displayKey: 'title_t',
        name: 'iview',
        templates: {
            //'suggestion' templating function used to render a single suggestion
            header: '<div class="aa-suggestions-category"><img src="/homepage/2013/styles/img/iview-logo.png"></div>',
            suggestion: function (suggestion) {
                return '<div class="video-wrapper"><a class="dropdown" href="' + suggestion.canonicalURL + '">' +
                    '<img class="video-thumbnail" src="' + suggestion.media.image.thumbnail.images['16x9'] + '">' +
                    '</a></div>' +
                    '<div class="video-text-wrapper"><span class="video-title">' + suggestion._highlightResult.series.title.value +
                    ':</span><span class="video-title">' + suggestion._highlightResult.title.value + '</span></div>'
            },
            empty: '<div class="aa-empty">No matching iView media.</div>'
        }
    },
    {
        source: autocomplete.sources.hits(tvIndex, {
            hitsPerPage: 3
        }),
        displayKey: 'title_t',
        name: 'tv',
        templates: {
            //'suggestion' templating function used to render a single suggestion
            header: '<div class="aa-suggestions-category"><img src="/homepage/2013/styles/img/television-logo.jpeg"></div>',
            suggestion: function (suggestion) {
                return '<div class="video-wrapper"><a class="dropdown" href="' + suggestion.canonicalURL + '">' +
                    '<img class="video-thumbnail" src="' + suggestion.media.image.poster.images['16x9'] + '">' +
                    '</a></div>' +
                    '<span class="video-title">' + suggestion._highlightResult.title.value +
                    '</span></div>'
            },
            empty: '<div class="aa-empty">No matching ABC television shows.</div>'
        }
    },

]);
