"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
var calendarModule = require("nativescript-telerik-ui-pro/calendar");
var frameModule = require("tns-core-modules/ui/frame");
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        var _this = _super.call(this) || this;
        _this._eventTitles = ["Flying", "Sax Lessons", "Biking",
            "Go shopping", "Very important meeting", "Another meeting", "Random event"];
        _this.createEvents();
        _this._viewModesInfo = {
            options: ["None", "Inline", "Popover (available on iPad only)"],
            index: 0
        };
        return _this;
    }
    Object.defineProperty(ViewModel.prototype, "eventsMode", {
        get: function () {
            return this.get("eventsViewMode");
        },
        set: function (value) {
            this.set("eventsViewMode", value);
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.createEvents = function () {
        var events = new Array();
        var j = 1;
        for (var i = 0; i < this._eventTitles.length; i++) {
            var now = new Date();
            var startDate = new Date(now.getFullYear(), now.getMonth(), j * 2);
            var endDate = new Date(now.getFullYear(), now.getMonth(), (j * 2) + (j % 3));
            var event = new calendarModule.CalendarEvent(this._eventTitles[i], startDate, endDate);
            events.push(event);
            j++;
        }
        this.calendarEvents = events;
    };
    ViewModel.prototype.updateEventsViewMode = function () {
        var radCalendar = (frameModule.topmost().getViewById("calendar"));
        if (!radCalendar.ios) {
            return;
        }
        var index = this._viewModesInfo.index;
        if (index == 0) {
            this.eventsMode = calendarModule.CalendarEventsViewMode.None;
        }
        else if (index == 1) {
            this.eventsMode = calendarModule.CalendarEventsViewMode.Inline;
        }
        else {
            if (UIDevice.currentDevice.userInterfaceIdiom === UIUserInterfaceIdiomPad) {
                this.eventsMode = calendarModule.CalendarEventsViewMode.Popover;
            }
            else {
                var prevIndex = 0;
                if (this.eventsMode === calendarModule.CalendarEventsViewMode.Inline) {
                    prevIndex = 1;
                }
                this._viewModesInfo.index = prevIndex;
            }
        }
    };
    ViewModel.prototype.onOptionsTapped = function () {
        var navigationEntry = {
            moduleName: "./navigation/options-menu/options",
            context: this._viewModesInfo,
            animated: true
        };
        frameModule.topmost().navigate(navigationEntry);
    };
    return ViewModel;
}(observableModule.Observable));
exports.ViewModel = ViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUVBQXNFO0FBQ3RFLHFFQUF3RTtBQUN4RSx1REFBMEQ7QUFLMUQ7SUFBK0IsNkJBQTJCO0lBS3REO1FBQUEsWUFDSSxpQkFBTyxTQU1WO1FBVE8sa0JBQVksR0FBa0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLFFBQVE7WUFDaEMsYUFBYSxFQUFFLHdCQUF3QixFQUFFLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBR2hILEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixLQUFJLENBQUMsY0FBYyxHQUFHO1lBQ2xCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsa0NBQWtDLENBQUM7WUFDL0QsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDOztJQUNOLENBQUM7SUFFRCxzQkFBSSxpQ0FBVTthQUFkO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0QyxDQUFDO2FBRUQsVUFBZSxLQUFhO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQzs7O09BSkE7SUFNTSxnQ0FBWSxHQUFuQjtRQUNJLElBQUksTUFBTSxHQUF3QyxJQUFJLEtBQUssRUFBZ0MsQ0FBQztRQUM1RixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDaEQsSUFBSSxHQUFHLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUMzQixJQUFJLFNBQVMsR0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6RSxJQUFJLE9BQU8sR0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUYsSUFBSSxLQUFLLEdBQUcsSUFBSSxjQUFjLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZGLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDVixDQUFDLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDSyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRU0sd0NBQW9CLEdBQTNCO1FBQ0ksSUFBSSxXQUFXLEdBQTJELENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzFILEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO1FBQzlDLEVBQUUsQ0FBQSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDO1FBQ2hFLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDO1FBQ25FLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLEtBQUssdUJBQXVCLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUM7WUFDcEUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxjQUFjLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDbkUsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDMUMsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRU0sbUNBQWUsR0FBdEI7UUFDSSxJQUFJLGVBQWUsR0FBRztZQUNsQixVQUFVLEVBQUUsbUNBQW1DO1lBQy9DLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYztZQUM1QixRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFDO1FBRUYsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBdEVELENBQStCLGdCQUFnQixDQUFDLFVBQVUsR0FzRXpEO0FBdEVZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9ic2VydmFibGVNb2R1bGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIik7XG5pbXBvcnQgY2FsZW5kYXJNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWktcHJvL2NhbGVuZGFyXCIpO1xuaW1wb3J0IGZyYW1lTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7XG5cbmRlY2xhcmUgdmFyIFVJRGV2aWNlOiBhbnk7XG5kZWNsYXJlIHZhciBVSVVzZXJJbnRlcmZhY2VJZGlvbVBhZDogYW55O1xuXG5leHBvcnQgY2xhc3MgVmlld01vZGVsIGV4dGVuZHMgb2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlIHtcbiAgICBjYWxlbmRhckV2ZW50czogQXJyYXk8Y2FsZW5kYXJNb2R1bGUuQ2FsZW5kYXJFdmVudD47XG4gICAgcHJpdmF0ZSBfdmlld01vZGVzSW5mbztcbiAgICBwcml2YXRlIF9ldmVudFRpdGxlczogQXJyYXk8c3RyaW5nPiA9IFtcIkZseWluZ1wiLCBcIlNheCBMZXNzb25zXCIsIFwiQmlraW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR28gc2hvcHBpbmdcIiwgXCJWZXJ5IGltcG9ydGFudCBtZWV0aW5nXCIsIFwiQW5vdGhlciBtZWV0aW5nXCIsIFwiUmFuZG9tIGV2ZW50XCJdO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNyZWF0ZUV2ZW50cygpO1xuICAgICAgICB0aGlzLl92aWV3TW9kZXNJbmZvID0ge1xuICAgICAgICAgICAgb3B0aW9uczogW1wiTm9uZVwiLCBcIklubGluZVwiLCBcIlBvcG92ZXIgKGF2YWlsYWJsZSBvbiBpUGFkIG9ubHkpXCJdLFxuICAgICAgICAgICAgaW5kZXg6IDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGV2ZW50c01vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChcImV2ZW50c1ZpZXdNb2RlXCIpO1xuICAgIH1cbiAgICBcbiAgICBzZXQgZXZlbnRzTW9kZSh2YWx1ZTogc3RyaW5nKSB7IFxuICAgICAgICB0aGlzLnNldChcImV2ZW50c1ZpZXdNb2RlXCIsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlRXZlbnRzKCkge1xuICAgICAgICBsZXQgZXZlbnRzOiBBcnJheTxjYWxlbmRhck1vZHVsZS5DYWxlbmRhckV2ZW50PiA9IG5ldyBBcnJheTxjYWxlbmRhck1vZHVsZS5DYWxlbmRhckV2ZW50PigpO1xuICAgICAgICBsZXQgaiA9IDE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZXZlbnRUaXRsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub3c6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdmFyIHN0YXJ0RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSwgaiAqIDIpO1xuICAgICAgICAgICAgdmFyIGVuZERhdGU6IERhdGUgPSBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSwgbm93LmdldE1vbnRoKCksIChqICogMikgKyAoaiAlIDMpKTtcblx0XHRcdHZhciBldmVudCA9IG5ldyBjYWxlbmRhck1vZHVsZS5DYWxlbmRhckV2ZW50KHRoaXMuX2V2ZW50VGl0bGVzW2ldLCBzdGFydERhdGUsIGVuZERhdGUpO1xuXHRcdFx0ZXZlbnRzLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgaisrO1xuXHRcdH1cbiAgICAgICAgdGhpcy5jYWxlbmRhckV2ZW50cyA9IGV2ZW50cztcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlRXZlbnRzVmlld01vZGUoKSB7XG4gICAgICAgIGxldCByYWRDYWxlbmRhcjogY2FsZW5kYXJNb2R1bGUuUmFkQ2FsZW5kYXIgPSA8Y2FsZW5kYXJNb2R1bGUuUmFkQ2FsZW5kYXI+KGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImNhbGVuZGFyXCIpKTtcbiAgICAgICAgaWYgKCFyYWRDYWxlbmRhci5pb3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGluZGV4OiBudW1iZXIgPSB0aGlzLl92aWV3TW9kZXNJbmZvLmluZGV4O1xuICAgICAgICBpZihpbmRleCA9PSAwKSB7XG4gICAgICAgICAgIHRoaXMuZXZlbnRzTW9kZSA9IGNhbGVuZGFyTW9kdWxlLkNhbGVuZGFyRXZlbnRzVmlld01vZGUuTm9uZTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c01vZGUgPSBjYWxlbmRhck1vZHVsZS5DYWxlbmRhckV2ZW50c1ZpZXdNb2RlLklubGluZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChVSURldmljZS5jdXJyZW50RGV2aWNlLnVzZXJJbnRlcmZhY2VJZGlvbSA9PT0gVUlVc2VySW50ZXJmYWNlSWRpb21QYWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c01vZGUgPSBjYWxlbmRhck1vZHVsZS5DYWxlbmRhckV2ZW50c1ZpZXdNb2RlLlBvcG92ZXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBwcmV2SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50c01vZGUgPT09IGNhbGVuZGFyTW9kdWxlLkNhbGVuZGFyRXZlbnRzVmlld01vZGUuSW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZJbmRleCA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdNb2Rlc0luZm8uaW5kZXggPSBwcmV2SW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBvbk9wdGlvbnNUYXBwZWQoKSB7XG4gICAgICAgIHZhciBuYXZpZ2F0aW9uRW50cnkgPSB7XG4gICAgICAgICAgICBtb2R1bGVOYW1lOiBcIi4vbmF2aWdhdGlvbi9vcHRpb25zLW1lbnUvb3B0aW9uc1wiLFxuICAgICAgICAgICAgY29udGV4dDogdGhpcy5fdmlld01vZGVzSW5mbyxcbiAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUobmF2aWdhdGlvbkVudHJ5KTtcbiAgICB9XG59Il19