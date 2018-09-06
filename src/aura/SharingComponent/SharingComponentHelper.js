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
	reload: function(component) {
		const helper = this;

		const action = component.get('c.getCurrentShares');
		action.setParams({
			recordId: component.get('v.recordId')
		});
		action.setCallback(this, function(response) {
			const state = response.getState();
			if (state === 'SUCCESS') {
			    const shares = JSON.parse(response.getReturnValue());
				component.set('v.shares', shares);
			}  else if (state === 'ERROR' && component.isValid()) {
				let err = response.getError();
                component.set('v.message', err[0].message);
			}
		});
		$A.enqueueAction(action);
	},

    /**
     * Updates or inserts the given share with the given level
     *
     * @param userOrGroupId The id of the user or group for the share
     * @param level the level of access to be given
     */
	upsertShare: function(component, btn, userOrGroupId, level) {
		const helper = this;
		const action = component.get('c.upsertShare');

		action.setParams({
			userOrGroupId: userOrGroupId,
			recordId: component.get('v.recordId'),
			level: level
		});

		action.setCallback(this, function(response){
			const state = response.getState();
			const btnSuccess = 'slds-button_success';
			if (state === 'SUCCESS') {
				helper.reload(component);
				$A.util.addClass(btn, btnSuccess);
				setTimeout($A.getCallback(function() {
				    $A.util.removeClass(btn, btnSuccess);
                }), 2000);
			} else if (state === 'ERROR' && component.isValid()) {
				$A.util.addClass(btn, 'slds-button_destructive');
				let err = response.getError();
                component.set('v.message', err[0].message);
			}
		});
		$A.enqueueAction(action);
	}
})