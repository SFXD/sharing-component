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

/**
 * Controller for the InputLookupComponent
 *
 * @author George Doenlen
 * @date 05 JUNE 2017
 */
public with sharing class InputLookupComponentController {

    /**
     * The maximum number of records returned from the query.
     * This is limited to prevent long round trip times from sending too much data
     * back to the client.
     */
    private static final Integer MAX_RECORDS = 10;

    /** This is a lightning component controller. It should never be instantiated. */
    private InputLookupComponentController() {

    }

    /**
     * Does a sosl search against the types of objects given with the search val
     * Defaults to search Name fields and returning Id, Name for each type
     * Limits to 10 return records for better UX.
     * 
     * @param types Array of API strings
     * @param searchVal the value we are searching for
     * @return list of records who name fields match our search
     */
    @AuraEnabled
    public static SObject[] getRecords(final String[] types, final String searchVal) {
        if (types.isEmpty()) {
            throw new IllegalArgumentException('sobjectType cannot be null or white space.');
        } else if (String.isBlank(searchVal)) {
            throw new IllegalArgumentException('searchField cannot be null or white space.');
        }

        String sosl = 'FIND \'*' + String.escapeSingleQuotes(searchVal) + '*\'' + ' IN NAME FIELDS RETURNING ';
        for (Integer i = 0, n = types.size(); i < n; i++) {
            final String s = String.escapeSingleQuotes(types[i]);
            sosl += s + '(Id, Name)';
            if (n > 1 && i != n - 1) { sosl += ','; }
            sosl += ' ';
        }
        sosl += 'LIMIT ' + MAX_RECORDS;

        List<SObject> ret = new List<SObject>();
        for (List<SObject> lst : Search.query(sosl)) {
            ret.addAll(lst);
        }

        return ret;
    }
}