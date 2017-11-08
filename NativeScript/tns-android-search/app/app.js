"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./bundle-config");
var app = require("application");
/**
 * Removes focus from the searchbar. If the page has a searchbar it gets focus on page loading automatically.
 * In order to prevent this behaviour this method must be used.
 */
global.removeSearchFocus = function (searchbar) {
    // TODO: we also have a method for removing focus in utils, refactor and move them in one place
    // get the parent of the searchbar
    var parent = searchbar.parent;
    if (!parent)
        throw 'Can not get SearchBar parent to remove focus';
    if (parent.android) {
        parent.android.setFocusableInTouchMode(true);
        parent.android.setFocusable(true);
        searchbar.android.clearFocus();
    }
    else if (searchbar.ios) {
        searchbar.ios.endEditing(true);
    }
};
app.start({ moduleName: 'main-page' });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQXdCO0FBQ3hCLGlDQUFrQztBQUVsQzs7O0dBR0c7QUFDSCxNQUFNLENBQUMsaUJBQWlCLEdBQUcsVUFBRSxTQUFTO0lBQ2xDLCtGQUErRjtJQUMvRixrQ0FBa0M7SUFDbEMsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQTtJQUUvQixFQUFFLENBQUMsQ0FBRSxDQUFDLE1BQU8sQ0FBQztRQUFDLE1BQU0sOENBQThDLENBQUE7SUFFbkUsRUFBRSxDQUFDLENBQUUsTUFBTSxDQUFDLE9BQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBRSxJQUFJLENBQUUsQ0FBQTtRQUM5QyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBRSxJQUFJLENBQUUsQ0FBQTtRQUNuQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ2xDLENBQUM7SUFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUUsU0FBUyxDQUFDLEdBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFFLENBQUE7SUFDcEMsQ0FBQztBQUNMLENBQUMsQ0FBQTtBQUVELEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vYnVuZGxlLWNvbmZpZ1wiXHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tICdhcHBsaWNhdGlvbidcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGZvY3VzIGZyb20gdGhlIHNlYXJjaGJhci4gSWYgdGhlIHBhZ2UgaGFzIGEgc2VhcmNoYmFyIGl0IGdldHMgZm9jdXMgb24gcGFnZSBsb2FkaW5nIGF1dG9tYXRpY2FsbHkuXHJcbiAqIEluIG9yZGVyIHRvIHByZXZlbnQgdGhpcyBiZWhhdmlvdXIgdGhpcyBtZXRob2QgbXVzdCBiZSB1c2VkLlxyXG4gKi9cclxuZ2xvYmFsLnJlbW92ZVNlYXJjaEZvY3VzID0gKCBzZWFyY2hiYXIgKSA9PiB7XHJcbiAgICAvLyBUT0RPOiB3ZSBhbHNvIGhhdmUgYSBtZXRob2QgZm9yIHJlbW92aW5nIGZvY3VzIGluIHV0aWxzLCByZWZhY3RvciBhbmQgbW92ZSB0aGVtIGluIG9uZSBwbGFjZVxyXG4gICAgLy8gZ2V0IHRoZSBwYXJlbnQgb2YgdGhlIHNlYXJjaGJhclxyXG4gICAgY29uc3QgcGFyZW50ID0gc2VhcmNoYmFyLnBhcmVudFxyXG5cclxuICAgIGlmICggIXBhcmVudCApIHRocm93ICdDYW4gbm90IGdldCBTZWFyY2hCYXIgcGFyZW50IHRvIHJlbW92ZSBmb2N1cydcclxuXHJcbiAgICBpZiAoIHBhcmVudC5hbmRyb2lkICkge1xyXG4gICAgICAgIHBhcmVudC5hbmRyb2lkLnNldEZvY3VzYWJsZUluVG91Y2hNb2RlKCB0cnVlIClcclxuICAgICAgICBwYXJlbnQuYW5kcm9pZC5zZXRGb2N1c2FibGUoIHRydWUgKVxyXG4gICAgICAgIHNlYXJjaGJhci5hbmRyb2lkLmNsZWFyRm9jdXMoKVxyXG4gICAgfVxyXG5cclxuICAgIGVsc2UgaWYgKCBzZWFyY2hiYXIuaW9zICkge1xyXG4gICAgICAgIHNlYXJjaGJhci5pb3MuZW5kRWRpdGluZyggdHJ1ZSApXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5zdGFydCh7IG1vZHVsZU5hbWU6ICdtYWluLXBhZ2UnIH0pXHJcbiJdfQ==