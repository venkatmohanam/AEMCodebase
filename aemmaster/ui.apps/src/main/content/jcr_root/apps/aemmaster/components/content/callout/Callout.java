package apps.aemmaster.components.content.callout;

import com.adobe.cq.sightly.WCMUsePojo;
  
public class Callout extends WCMUsePojo {
    private String title;
    private String description;
    private String linktext;
    private String pagepath;
    private String externallink;

    @Override
    public void activate() throws Exception {
        title = getProperties().get("jcr:title", "Some Title");      
        title = title;
        description = getProperties().get("jcr:description", "Sample Description text goes here");
        if(description.length() >120){
            description = description.substring(0, 119);
        }

        linktext = getProperties().get("jcr:linktext", "link text here");
        pagepath = getProperties().get("pagepath", "");
        externallink = getProperties().get("externallink", "");
    }
  
    // Must have to get back the value in html file
    // Explanation : 'get' + capitalize method name
    public String getTitle() {
        return title;
    }
    
    public String getDescription() {
        return description;
    }

    public String getLinktext() {
        return linktext;
    }

    public String getPagepath() {
        return pagepath;
    }

    public String getExternallink() {
        return externallink;
    }


}