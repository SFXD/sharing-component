/*
    MIT License

    Copyright (c) 2017 Shane McLaughlin

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
    upsertShare: function(component, level) {
        const action = component.get("c.upsertShare");

        action.setParams({
        	userOrGroupId: component.get("v.share").UserOrGroupId,
        	recordId: component.get("v.recordId"),
        	level: level
        });

        action.setCallback(this, function(response){
        	const state = response.getState();
        	if (state === "SUCCESS") {
        		component.getEvent("reload").fire();
        	} else if (state === "ERROR") {

        	}
        });
        $A.enqueueAction(action);
    },

    deleteShare: function(component) {
        const action = component.get("c.deleteShare");
        action.setParams({
            userOrGroupId: component.get("v.share").UserOrGroupId,
            recordId: component.get("v.recordId")
        });
        action.setCallback(this, function(response) {
           	const state = response.getState();
           	if (state === "SUCCESS") {
           		component.getEvent("reload").fire();
           	} else if (state === "ERROR") {

           	}
        });
        $A.enqueueAction(action);
    }
})