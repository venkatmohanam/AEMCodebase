$(document).ready(function() {

    var countriesJson = null;
	var locale = "ja";
    var topLevelTagName = "_content_cq_tags_websiteregions";

    //call Countries display list JSON on page load
    var countriesDisplayJsonAjaxRequest = $.ajax({
        url: "http://localhost:4502/bin/aemtraining/websiteregionstags",
        type: "GET"
    });

    countriesDisplayJsonAjaxRequest.done(function(jsondata) {
        console.log("Ajax call done!!!");
		countriesJson = jsondata;



        try {
            //check for the required JSON availability and then proceed
            if ((typeof countriesJson == 'undefined') || (typeof countriesJson.OrderedRegionsList == 'undefined') || (typeof countriesJson.AttributeValues == 'undefined')) {
                console.log("required ROOT level json not availavle to parse: Either countriesJson or countriesJson.OrderedRegionsList seems to be missing");
            } else {
                generateCountriesDisplayHTML();
            }
        } catch (e) {
            console.log(e);
        }
    });

    countriesDisplayJsonAjaxRequest.fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });



    display_languageOptions = function(country) {
        var OrderedLanguageOptionsJson = countriesJson.OrderedRegionsList[country];
        if (OrderedLanguageOptionsJson != null && OrderedLanguageOptionsJson.length > 0) {

            var OrderedLanguageOptionsArray = OrderedLanguageOptionsJson.split(",");
            var lang_counter = 0;
            var outputHtml = [];
            //add the Start bracket for the language option
            outputHtml.push("<span class=\"text-black\">(</span>");
            OrderedLanguageOptionsArray.forEach(function(languageoption) {
                lang_counter++;
                var displayname = "";
                var localizedDisplayName = "";
                if (typeof countriesJson.AttributeValues[languageoption] !== 'undefined') {
                    displayname = countriesJson.AttributeValues[languageoption].title;
                    if (typeof countriesJson.AttributeValues[languageoption].localizedtitles !== 'undefined') {
                        localizedDisplayName = countriesJson.AttributeValues[languageoption].localizedtitles[locale];
                    }
                }
                if (typeof localizedDisplayName == 'undefined') {
                    localizedDisplayName = displayname;
                }
                if (lang_counter > 1) {
                    //add the middle separator for language option
                    outputHtml.push("<span class=\"text-black v-middle\">|</span>");
                }
                //form the languageoption anchor tag 
                outputHtml.push("<a href=\"#\" title=\"");
                outputHtml.push(localizedDisplayName);
                outputHtml.push("\" class=\"text-black\">");
                outputHtml.push(localizedDisplayName);
                outputHtml.push("</a>");

            });
            //add the End bracket for the language option
            outputHtml.push("<span class=\"text-black\">)</span>");
            var languageOptionHTML = outputHtml.join("");
            return languageOptionHTML;
        }
        return "";
    };

    display_countries = function(region) {
        var OrderedCountriesJson = countriesJson.OrderedRegionsList[region];
        if (OrderedCountriesJson != null && OrderedCountriesJson.length > 0) {
            var OrderedCountriesArray = OrderedCountriesJson.split(",");
            var countryCaptionUL = "<ul class=\"small\"></ul>";
            var countryCaptionULElem = $.parseHTML(countryCaptionUL);
            OrderedCountriesArray.forEach(function(country) {
                var displayname = "";
                var localizedDisplayName = "";
                if (typeof countriesJson.AttributeValues[country] !== 'undefined') {
                    displayname = countriesJson.AttributeValues[country].title;
                    if (typeof countriesJson.AttributeValues[country].localizedtitles !== 'undefined') {
                        localizedDisplayName = countriesJson.AttributeValues[country].localizedtitles[locale];
                    }
                }
                if (typeof localizedDisplayName == 'undefined') {
                    localizedDisplayName = displayname;
                }
				
				var cssClassName = displayname.toLowerCase();
				cssClassName = cssClassName.replace(" ", "-");
								
                var htmlCountryCaptionLi = [];
                htmlCountryCaptionLi.push("<li class=\"");
                htmlCountryCaptionLi.push(cssClassName);
                htmlCountryCaptionLi.push("\" role=\"menuitem\"><a href=\"#\" title=\"");
                htmlCountryCaptionLi.push(displayname);
                htmlCountryCaptionLi.push("\" class=\"text-black\">");
                htmlCountryCaptionLi.push(localizedDisplayName);
                htmlCountryCaptionLi.push("</a></li>");

                var languageOptionHTML = display_languageOptions(country);
                htmlCountryCaptionLi.push(languageOptionHTML);
                var countryCaptionLi = htmlCountryCaptionLi.join("");
                $(countryCaptionULElem).append(countryCaptionLi);
            });
            //console.log(countryCaptionULElem);
            return countryCaptionULElem;
        }
        return "";
    };

    generateCountriesDisplayHTML = function() {

        var topLevelColumnDiv = "<div class=\"columns medium-4\"></div>";
        var topLevelColumnDivElem = $.parseHTML(topLevelColumnDiv);
        var OrderedRegionsJson = countriesJson.OrderedRegionsList[topLevelTagName];
        if (OrderedRegionsJson != null && OrderedRegionsJson.length > 0) {
            var OrderedRegionsArray = OrderedRegionsJson.split(",");

            OrderedRegionsArray.forEach(function(region) {
                //console.log(element);
                var displayname = "";
                var localizedDisplayName = "";
                if (typeof countriesJson.AttributeValues[region] !== 'undefined') {
                    displayname = countriesJson.AttributeValues[region].title;
                    if (typeof countriesJson.AttributeValues[region].localizedtitles !== 'undefined') {
                        localizedDisplayName = countriesJson.AttributeValues[region].localizedtitles[locale];
                    }
                }
                if (typeof localizedDisplayName == 'undefined') {
                    localizedDisplayName = displayname;
                }

                var htmlForRegion = [];
                htmlForRegion.push("<h6 class=\"small mt1 text-black\">");
                htmlForRegion.push(localizedDisplayName);
                htmlForRegion.push("</h6>");
                var outputHtmlForRegion = htmlForRegion.join("");
                console.log(displayname);
                console.log(localizedDisplayName);

                if (displayname == 'EUROPE' || displayname == 'ASIA PACIFIC') {
                    //create a new column
                    topLevelColumnDivElem = $.parseHTML(topLevelColumnDiv);
                    $(topLevelColumnDivElem).append(outputHtmlForRegion);
                    var country_display_ul_Elem = display_countries(region);
                    $(topLevelColumnDivElem).append(country_display_ul_Elem);
                } else {

                    $(topLevelColumnDivElem).append(outputHtmlForRegion);
                    var country_display_ul_Elem = display_countries(region);
                    $(topLevelColumnDivElem).append(country_display_ul_Elem);
                }

                $("div[data-countries-list='listallregions']").append(topLevelColumnDivElem);
            });
        } else {
            console.log("required json not availavle to parse for the node '_content_cq_tags_websiteregions'");
        }
    };

    $("#worldwidemenu").on("click", function() {
        if ($("#drop1").hasClass("js-dropdown-active")) {
            $("#drop1").removeClass("js-dropdown-active");
        } else {
            $("#drop1").addClass("js-dropdown-active");
        }
    });


});