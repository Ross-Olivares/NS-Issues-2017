var Observable = require("data/observable").Observable;
var gesturesModule = require("ui/gestures");
var app = require("application");
var firebase = require("nativescript-plugin-firebase");
var applicationSettingsModule = require("application-settings");

var utility = require("~/common/utility");
var constants = require("~/common/constants");
var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var utils = require("utils/utils");
var Color = require("color").Color;
var mapsModule = require("nativescript-google-maps-sdk");
var tabViewUtil = require("~/components/tabview-util");
var location = require("~/components/location");

var LocationSearchViewModel = require("./location-search-view-model");

var view = new View();
view.viewModel = new LocationSearchViewModel([]);

view.loaded = function (page) {
    var that = view;
    that.page = page;
   
    var filter = that.page.getViewById("filter");
    filter.animate({
        translate: { x: 0, y: 1500 }
    });

    that.locationListElement = that.page.getViewById("locations-list");
    that.mainContentElement = that.page.getViewById("main-content");
    that.searchBox = that.page.getViewById("txtSearchBox");
    that.lvFilterBy = that.page.getViewById("lvFilterBy");

    tabViewUtil.selectTab(that.viewModel, that.page, 0);

    if (that.page._navigationContext && that.page._navigationContext.erAndUrgentCareOnly) {
        that.viewModel.set("pageTitle", "Find ER/Urgent Care");
    }
    else {
        that.viewModel.set("pageTitle", "Find a Location");
    }

    that.viewModel.set("showLocationFailureWarning", true);
    if (that.page._navigationContext && that.page._navigationContext.erAndUrgentCareOnly) {
        that.viewModel.set("isSearching", true);
        console.log("ERs and Urgent Care Only");
        that.viewModel.set("searchTerm", "");
        that.viewModel.setDefaults();
        if (that.viewModel.currentCriteria.filterBy.length === 0) {
            that.viewModel.loadFilters()
            .then(function (data) {
                that.viewModel.selectERAndUrgentCare();
                that.viewModel.search();
            });
        }
        else {
            that.viewModel.selectERAndUrgentCare();
            that.viewModel.search();
        }
    }
    else {
        if (!that.viewModel.get("isInitialized")) {
            that.viewModel.setDefaults();
            that.viewModel.loadFilters();
            that.viewModel.set("isSearching", true);
            that.viewModel.search();
        }
    }
};

view.onSearchBtnTap = function (args) {
    var that = view;
    console.log("searchbuttonpress");
    that.search(args);
};

view.search = function (args) {
    var that = view;

    that.searchBox.dismissSoftInput();
    if (!that.viewModel.get("searchButtonPressed")) {
        that.viewModel.set("searchButtonPressed", true);
        that.viewModel.search();
    }
};

view.launchMap = function (args) {
    var that = view;
    try {
        var location = args.object.get("parent").get("parent").bindingContext;

        utility.leavingapp(function (data) {
            firebase.analytics.logEvent({
                key: "LocationGetDirections",
                parameters: [
                {
                    key: "LocationID",
                    value: location != null && location.LocationID != null ? location.LocationID.toString() : null
                }]
            });
            console.log("launching map for " + location.Coordinates.Latitude + "," + location.Coordinates.Longitude);

            var formattedAddress = "";
            if (location.Address1) {
                // using street address
                formattedAddress += location.Address1;

                if (location.Address2) {
                    formattedAddress += " " + location.Address2;
                }
                if (location.City && location.State) {
                    formattedAddress += " " + location.City + ", " + location.State;
                }
                if (location.PostalCode) {
                    formattedAddress += " " + location.PostalCode;
                }
            }
            else if (location.Coordinates &&
                    location.Coordinates.Latitude &&
                    location.Coordinates.Longitude) {
                // using geocordinates
                utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + location.Coordinates.Latitude + "," + location.Coordinates.Longitude);
            }
            else {
                that.showError("Error mapping location. Could not find address or geocordinates for selected location.");
            }
            utils.openUrl("https://maps.google.com?saddr=Current+Location&daddr=" + encodeURIComponent(formattedAddress));
        }, function (data) {
            // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        });
    }
    catch(ex) {
        console.log("Failed to get LocationID for launchMap");        
    }
};

view.callLocation = function (args) {
    var that = view;
    try {
        var location = args.object.get("parent").get("parent").bindingContext;

        // remove special chars from phone number
        var phone = location.Phone.replace(/ |-|\(|\)/g, '');

        firebase.analytics.logEvent({
            key: "CallLocation",
            parameters: [
            {
                key: "LocationID",
                value: location != null && location.LocationID != null ? location.LocationID.toString() : null
            }]
        });
        console.log("Calling " + phone);
        utils.openUrl("tel://" + phone);
    }
    catch(ex) {
        console.log("Failed to get location for callLocation.");
    }
};

view.openURL = function (args) {
    var that = view;
    try {
        var location = args.object.get("parent").get("parent").bindingContext;

        utility.leavingapp(function (data) {
            firebase.analytics.logEvent({
                key: "LocationLaunchURL",
                parameters: [
                {
                    key: "LocationID",
                    value: location != null && location.LocationID != null ? location.LocationID.toString() : null
                }]
            });
            console.log("launching url for " + location.DisplayName);
            utils.openUrl(location.URL);
        }, function (data) {
            // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        });
    }
    catch(ex) {
        console.log("Failed to get location for openURL.");
    }
};

view.submitCheckIn = function (args) {
    var location = args.object._parent._parent.bindingContext;
    console.log("Submit check in for: " + location.DisplayName + " with location time = " + location.availableTimes[location.selectedTime]);
};

view.disableInput = function () {
    var that = view;
    that.searchBox.editable = false;
};

view.enableInput = function () {
    var that = view;
    that.searchBox.editable = true;
};

view.showFilter = function () {
    var that = view;
    var filter = that.page.getViewById("filter");
    filter.animate({
        opacity: 1,
        translate: { x: 0, y: 0 }
    });
    console.log(filter);
}

view.tapClose = function () {
    var that = view;
    console.log("enter tapclose");
    console.log("Er true pageTitle:" + that.viewModel.get("pageTitle"));
    console.log("models:" + that.viewModel.get("pageTitle"));

    if (that.viewModel.get("pageTitle") == "Find ER/Urgent Care") {
        console.log("Er true urgent");
        view.clearSearchTerm();
        navigation.goToFindEROrUrgentCare();
    }

    if (that.viewModel.get("pageTitle") == "Find a Location") {
        that.viewModel.set("isInitialized", false)
        console.log("Er false nrmal");
        view.onTapSelectAll();
        //view.onTapApply();
    }
    var locationTypeIds = that.viewModel.getFilters();
    var requestOptions = that.viewModel.getSearchRequestOptions(locationTypeIds);
    console.log(requestOptions+".....requestOptions after search...."+locationTypeIds);
    if(locationTypeIds == null){
        that.viewModel.set("isFilterSelectAll", true);
        view.onTapApply();
        that.closeFilter();
    } else {
        that.closeFilter();
        that.viewModel.discardChanges();
    }
    
}


view.closeFilter = function () {
    var that = view;
    var filter = that.page.getViewById("filter");
    console.log(filter+"....filter");
    filter.animate({
        translate: { x: 0, y: 1500 }
    });
}

view.onTapApply = function (args) {
    var that = view;
    that.viewModel.applyFilters();
    that.search(args);
    var locationTypeIds = that.viewModel.getFilters();
    var requestOptions = that.viewModel.getSearchRequestOptions(locationTypeIds);
    if(locationTypeIds == null){
        
    } else {
        that.closeFilter();
    }
    // log event - filter search criteria
    firebase.analytics.logEvent({
        key: "FilterLocationSearchResults"
    });
}

view.toggleMapListView = function (args) {
    view.viewModel.set("showList", !view.viewModel.get("showList"));
};

view.Distance = function (args) {
    var that = view;
    that.viewModel.set("sortByClosest", !that.viewModel.get("sortByClosest"));
}

view.onTapLocationType = function (args) {
    var that = view;
    var item = that.viewModel.get("filterBy").getItem(args.index);

    if (item.isSelected) {
        item.isSelected = false;
        that.viewModel.set("isFilterSelectAll", false);
    }
    else {
        item.isSelected = true;
        var allSelected = true;
        that.viewModel.filterBy.forEach(function (item) {
            if (!item.isSelected) {
                allSelected = false;
            }
        }, this);
        that.viewModel.set("isFilterSelectAll", allSelected);
    }

    that.lvFilterBy.refresh();

}

view.onTapSelectAll = function (args) {
    var that = view;
    if (!that.viewModel.get("isFilterSelectAll")) {
        that.viewModel.set("isFilterSelectAll", true);
        that.viewModel.filterBy.forEach(function (item) {
            item.isSelected = true;
        }, this);
        that.lvFilterBy.refresh();
    }
    else {
        that.viewModel.set("isFilterSelectAll", false);
        that.viewModel.filterBy.forEach(function (item) {
            item.isSelected = false;
        }, this);
        that.lvFilterBy.refresh();
    }
}

// custom viewModel events
view.viewModel.on("notifyLoadOnDemandFinished", function (eventData) {
    view.locationListElement.notifyLoadOnDemandFinished();
});

view.viewModel.on("refresh", function (eventData) {
    view.locationListElement.refresh();
});

view.viewModel.on("scrollToTopList", function (eventData) {
    var that = view;
    if (that.viewModel.searchResults.Count > 0 &&
        that.locationListElement.Count > 0) {
        that.locationListElement.scrollToIndex(0);
    }
});

view.viewModel.on("disableInput", function (eventData) {
    view.disableInput();
});

view.viewModel.on("enableInput", function (eventData) {
    view.enableInput();
});

view.wait = function (milliSeconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(milliSeconds);
        }, milliSeconds);
    });
};

view.onMapReady = function (args) {
    var that = view;
    console.log("onMapReady");

    that.mapView = args.object;

    console.log("Map Ready");

    if (that.viewModel.get("searchResults").Data.length > 0) {
        that.addMapMarkersAndCenter();
    }

    that.viewModel.set("isMapInitialized", true);
};

view.onCoordinateTapped = function (args) {
    console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
};

view.onMarkerEvent = function (args) {
    console.log("Marker Event: '" + args.eventName
                 + "' triggered on: " + args.marker.title
                 + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
};

view.lastCamera = null;
view.onCameraChanged = function (args) {
    console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === view.lastCamera);
    view.lastCamera = JSON.stringify(args.camera);
};

view.addMapMarkersAndCenter = function () {
    var that = view;
    if (that.mapView) {
        if (that.viewModel.get("searchResults").Count > 0) {
            // add marker for current location
            // var currentLocation = that.viewModel.get("currentLocation");
            // if(currentLocation.latitude != null && currentLocation.longitude != null) {
            //     var markerCurrentLocation = new mapsModule.Marker();
            //     markerCurrentLocation.position = mapsModule.Position.positionFromLatLng(currentLocation.latitude, currentLocation.longitude);
            //     markerCurrentLocation.title = "You";
            //     markerCurrentLocation.userData = {index: -1};

            //     // var icon = new Image();
            //     // icon.imageSource = imageSource.fromResource('icon');
            //     // marker.icon = icon;
            //     markerCurrentLocation.icon = 'icon';

            //     that.mapView.addMarker(markerCurrentLocation);
            // }

            // add markers for location search results
            that.viewModel.get("searchResults").Data.forEach(function (location) {
                var marker = new mapsModule.Marker();
                marker.position = mapsModule.Position.positionFromLatLng(location.Coordinates.Latitude, location.Coordinates.Longitude);
                marker.title = location.DisplayName;
                marker.snippet = location.City + ", " + location.State + (location.Distance != null ? " " + location.Distance + "mi" : "");
                marker.userData = { index: location.LocationID };
                that.mapView.addMarker(marker);
            }, this);

            // center camera and zoom to appropriate level to fit markers
            if (app.android) {
                //that.mapView.updateCameraBounds(that.viewModel.get("searchResults").Data, 50);
            }
        }
    }
};

view.viewModel.on("addMapMarkersAndCenter", function () {
    view.addMapMarkersAndCenter();
});

view.removeMapMarkers = function () {
    var that = view;
    if (that.mapView) {
        console.log("removing markers");
        that.viewModel.get("searchResults").Data.forEach(function (location) {
            var marker = that.mapView.findMarker(function (marker) {
                return marker.userData.index === location.LocationID;
            });
            if (marker) {
                that.mapView.removeMarker(marker);
            }

            //console.log("removed marker for LocationID: " + location.LocationID);
        }, this);
    }
};

view.viewModel.on("removeMapMarkers", function () {
    view.removeMapMarkers();
});

view.onStartLoadingInQuicker = function (args) {
    var webView = args.object;

    // Disable scrolling and zoom for android WebView
    if (webView.android) {
        webView.android.setScrollbarFadingEnabled(true);
        webView.android.getSettings().setBuiltInZoomControls(false);
        webView.android.setVerticalScrollBarEnabled(false);
        webView.android.setHorizontalScrollBarEnabled(false);
    }

    if (args.url && args.url.indexOf(constants.InQuickerBaseURL) !== -1) {
        webView.stopLoading();
        var location = null;
        try {
            location = webView.get("parent").get("parent").get("parent").bindingContext;
        }
        catch(ex) {
            console.log("Failed to get LocationID for InQuickerItem");
        }

        navigation.goToInQuicker(args.url);
        
        firebase.analytics.logEvent({
            key: "OpenInQuicker",
            parameters: [
            {
                key: "LocationID",
                value: location != null && location.LocationID != null ? location.LocationID.toString() : null
            }]

        });
    }
};

view.showAccessUH = function (args) {
    /*view.viewModel.set("selectedScreen", 0);*/
    navigation.goToAccessUH();
    console.log("tab1 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};
view.showEHI = function (args) {
    //view.viewModel.set("selectedScreen", 1);
    navigation.goToExploreHealth();
    console.log("tab2 click")
    console.log("selectedScreen" + view.viewModel.get("selectedScreen"))
};

view.clearSearchTerm = function (args) {
    var that = view;
    that.viewModel.set("searchTerm", "");

    that.page.getViewById("txtSearchBox").focus();
};

module.exports = view;