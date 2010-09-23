package org.auscope.portal.server.web.view;

import java.util.ArrayList;
import java.util.List;

import org.auscope.portal.csw.CSWRecord;
import org.springframework.ui.ModelMap;

/**
 * Contains methods that aid in turning CSWRecords into responses to send to the view.
 * 
 * 
 * @author vot002
 *
 */
public abstract class CSWRecordResponse {
	/**
     * Utility for generating a response model
     * @param success
     * @param records Can be null
     * @return
     */
    protected JSONModelAndView generateJSONResponse(boolean success, String message, List<ModelMap> records) {
    	ModelMap response = new ModelMap();
    	
    	response.put("success", success);
    	response.put("msg", message);
    	if (records != null) {
    		response.put("records", records);
    	}
    	
    	return new JSONModelAndView(response);
    }
    
    /**
     * Utility for generating a response model
     * @param records
     * @return
     */
    protected JSONModelAndView generateJSONResponse(ViewCSWRecordFactory viewCSWRecordFactory, CSWRecord[] records) {
    	List<ModelMap> recordRepresentations = new ArrayList<ModelMap>();
    	
    	try {
	    	for (CSWRecord record : records) {
	    		recordRepresentations.add(viewCSWRecordFactory.toView(record));
	    	}
    	 } catch (Exception ex) {
    		 return generateJSONResponse(false, "Error getting data records", null);
    	 }
    	
    	return generateJSONResponse(true, "No errors", recordRepresentations);
    }
}
