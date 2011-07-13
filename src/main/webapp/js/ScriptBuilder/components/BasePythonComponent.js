/*
 * This file is part of the AuScope Virtual Exploration Geophysics Lab (VEGL) project.
 * Copyright (c) 2011 CSIRO Earth Science and Resource Engineering
 *
 * Licensed under the terms of the GNU Lesser General Public License.
 */
Ext.namespace("ScriptBuilder");

/**
 * This is an 'abstract' base component that provides a number of helper methods useful for generating
 * python source 
 */
ScriptBuilder.BasePythonComponent = Ext.extend(ScriptBuilder.BaseComponent, {

    constructor: function(container, compTitle, compId, compType) {
        ScriptBuilder.BasePythonComponent.superclass.constructor.apply(this, 
                [ container, compTitle, compId, compType]);
    },
    
    /**
     * The tab string used for generating our python script
     */
    _tab : '    ',
    
    /**
     * The new line string used for generating our python script
     */
    _newLine : '\n',
    
    /**
     * Capitalises the first character of a String s
     */
    _capitaliseFirst : function(s) {
        if (s.length == 0) {
            return '';
        }
        
        return s.charAt(0).toUpperCase() + s.substring(1);
    },
    
    
    /**
     * Given an array of field names as strings, generate a simple
     * Plain old Python Object (POPO) class that can get the required fields
     */
    _popoClass : function(className, fields) {
        var classText = '';
        
        classText += 'class ' + className + ':' + this._newLine;
        
        //Local variables
        for (var i = 0; i < fields.length; i++) {
            classText += this._tab + '_' + fields[i] + ' = None' + this._newLine;
        }
        classText += this._newLine;
        
        //Constructor definition
        classText += this._tab + 'def __init__(self';
        for (var i = 0; i < fields.length; i++) {
            classText += ', ' + fields[i]; 
        }
        classText += '):' + this._newLine;
        
        //Constructor body
        for (var i = 0; i < fields.length; i++) {
            classText += this._tab + this._tab + 'self._' + fields[i] + ' = ' + fields[i] + this._newLine;
        }
        classText += this._newLine;
        
        //Getter fields
        for (var i = 0; i < fields.length; i++) {
            classText += this._getPrimitiveFunction(fields[i], 'self._' + fields[i], this._tab, true);
        }
        classText += this._newLine;
        
        return classText;
    },
    
    /**
     * given a value of a primitive return the (possibly quoted) equivalent in python that can be assigned
     * to a variable or passed as an argument literal.
     * 
     * forceUnquotedValue - [Optional] if true value will be forcibly printed without quotes
     */
    _getPrimitiveValue : function(value, forceUnquotedValue) {
        
        //Ext JS forms can't return non string values so we need to be very sure we dont have
        //and integer/float encoded as a string
        var isString = false;
        if (!forceUnquotedValue) {
            isString = Ext.isString(value)
            if (isString && value.length > 0) {
                if (value.match(/[0-9]/i)) {
                    isString = isNaN(parseFloat(value));
                }
            }
        }
        
        if (isString) {
            return "'" + value + "'";
        }
        
        return value;
    },
    
    /**
     * Generates a Python snippet as a String.
     * 
     *  The snippet will be a 'Get' function for fieldName that returns value.
     *  
     *  forceUnquotedValue - [Optional] if true value will be forcibly printed without quotes
     */
    _getPrimitiveFunction : function(fieldName, value, baseIndent, forceUnquotedValue) {
        var functionText = '';
        
        functionText += baseIndent + 'def get' + this._capitaliseFirst(fieldName) + '(self):' + this._newLine;
        functionText += baseIndent + this._tab + 'return ' + this._getPrimitiveValue(value, forceUnquotedValue) + '' + this._newLine;
        functionText += this._newLine;
        
        
        return functionText;
    }
});
