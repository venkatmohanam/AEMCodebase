package apps.aemmaster.components.content.timedisplay;

import com.adobe.cq.sightly.WCMUsePojo;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class EventModel extends WCMUsePojo {
    private String eventDate;

    @Override
    public void activate() {
        Calendar eventCalendar = Calendar.getInstance();
        DateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
        eventDate = outputFormat.format(eventCalendar.getTime());
    }

    public String getEventDate() {
        return eventDate;
    }
}