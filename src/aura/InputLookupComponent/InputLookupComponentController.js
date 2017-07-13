/*
    MIT License

    Copyright (c) 2017 George Doenlen

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/
({
    search: function(component, event, helper) {
    	const input = event.getSource();
    	const searchVal = input.get("v.value");

        if (searchVal.length > 2) {
            input.set("v.isLoading", true);
            const search = component.get("c.getRecords");
            search.setParams({
                types: component.get("v.objectTypes"),
                searchVal: searchVal
            });
            search.setCallback(this, function(response) {
                const state = response.getState();
                if (state === "SUCCESS" && component.isValid()) {
                    component.set("v.results", response.getReturnValue());
                    input.set("v.isLoading", false);
                }
            });
            $A.enqueueAction(search);
        } else {
            component.set("v.results", []);
            input.set("v.isLoading", false);
        }
    },

    clear: function(component, event, helper) {
        component.set("v.selectedRecord", null);
        component.set("v.results", []);
    },

    select: function(component, event, helper) {
        const index = event.target.getAttribute("data-index");
        const results = component.get("v.results");
        component.set("v.selectedRecord", results[index]);
    }
})