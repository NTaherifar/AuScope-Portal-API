package org.auscope.portal.gsml;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.auscope.portal.core.services.methodmakers.filter.AbstractFilter;
import org.auscope.portal.core.services.methodmakers.filter.FilterBoundingBox;
import org.springframework.stereotype.Service;


/**
 * A class for filter SF0 Borehole web service
 * @author Florence Tan
 *
 */
@Service

public class SF0BoreholeFilter extends AbstractFilter {

    private String boreholeName;
    private String custodian;
    private String dateOfDrilling;
    private List<String> restrictToIDList;


    // -------------------------------------------------------------- Constants

    /** Log object for this class. */
    private final Log logger = LogFactory.getLog(getClass());

    // ----------------------------------------------------------- Constructors

    public SF0BoreholeFilter() {
        // test
    }

    public SF0BoreholeFilter(String boreholeName, String custodian, String dateOfDrilling, List<String> restrictToIDList) {
        this.boreholeName = boreholeName;
        this.custodian = custodian;
        this.dateOfDrilling = dateOfDrilling;
        this.restrictToIDList = restrictToIDList;
    }

    // --------------------------------------------------------- Public Methods

    @Override
    public String getFilterStringAllRecords() {
        return this.generateFilter(this.generateFilterFragment());
    }

    @Override
    public String getFilterStringBoundingBox(FilterBoundingBox bbox) {

        return this
                .generateFilter(this.generateAndComparisonFragment(
                        this.generateBboxFragment(bbox,
                                "gsmlp:shape"),
                        this.generateFilterFragment()));
    }

    // -------------------------------------------------------- Private Methods
    private String generateFilterFragment() {
        List<String> parameterFragments = new ArrayList<String>();
        if (boreholeName != null && !boreholeName.isEmpty()) {
            parameterFragments.add(this.generatePropertyIsLikeFragment(
                    "gsmlp:name", this.boreholeName));
        }

        if (custodian != null && !custodian.isEmpty()) {
            parameterFragments
                    .add(this
                            .generatePropertyIsLikeFragment(
                                    "gsmlp:boreholeMaterialCustodian",
                                    this.custodian));
        }

        if (dateOfDrilling != null && !dateOfDrilling.isEmpty()) {
            parameterFragments.add(this.generatePropertyIsLikeFragment(
                    "gsmlp:drillStartDate",
                    this.dateOfDrilling));
        }

        if (this.restrictToIDList != null && !this.restrictToIDList.isEmpty()) {
            List<String> idFragments = new ArrayList<String>();
            for (String id : restrictToIDList) {
                if (id != null && id.length() > 0) {
                    idFragments.add(this.generatePropertyIsEqualToFragment(
                            "gsmlp:specification_uri", id, true));
                }
            }
            parameterFragments.add(this
                    .generateOrComparisonFragment(idFragments
                            .toArray(new String[idFragments.size()])));
        }

        return this.generateAndComparisonFragment(this
                .generateAndComparisonFragment(parameterFragments
                        .toArray(new String[parameterFragments.size()])));
    }
}