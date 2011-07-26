package org.auscope.portal.csw;

import org.auscope.portal.server.domain.filter.FilterBoundingBox;
import org.junit.Assert;
import org.junit.Test;

/**
 * Unit tests for CSWGetDataRecordsFilter
 * @author Josh Vote
 *
 */
public class TestCSWGetDataRecordsFilter {

    /**
     * Performs a dirt simple test that optional fields don't generate exceptions or
     * empty strings
     */
    @Test
    public void testOptionalFields() {
        //Test all optional
        CSWGetDataRecordsFilter filter = new CSWGetDataRecordsFilter(
                null,
                null,
                null,
                null);
        String filterStr = filter.getFilterStringAllRecords();
        Assert.assertNotNull(filterStr);
        Assert.assertTrue(filterStr.isEmpty());

        //Test all set
        filter = new CSWGetDataRecordsFilter(new FilterBoundingBox(
                    "epsg:4326",
                    new double[] {1.0, 2.0},
                    new double[] {3.0, 4.0}),
                new String[] {"kw1", "kw2"},
                "capturePlatform",
                "sensor");
        filterStr = filter.getFilterStringAllRecords();
        Assert.assertNotNull(filterStr);
        Assert.assertFalse(filterStr.isEmpty());
    }
}
