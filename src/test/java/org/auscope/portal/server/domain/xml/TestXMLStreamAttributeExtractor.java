package org.auscope.portal.server.domain.xml;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class TestXMLStreamAttributeExtractor {

    private XMLStreamAttributeExtractor extractor;

    @Before
    public void setup() throws IOException {
        try (InputStream is = new FileInputStream("src/test/resources/TestXMLAttributeStreamReader.xml")) {
            extractor = new XMLStreamAttributeExtractor("dElement", "attr", is, "UTF-8");
        }
    }

    @Test
    public void testGetAttributes() {
        List<String> list = new ArrayList<>();
        List<String> expectation = Arrays.asList("attr-1", "attr-2", "attr-3", "attr-4", "attr-5");

        while (extractor.hasNext()) {
            list.add(extractor.next());
        }

        Assert.assertArrayEquals(expectation.toArray(), list.toArray());
    }
}
