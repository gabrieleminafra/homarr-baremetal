import mediaTranscoding from '~/widgets/media-transcoding/MediaTranscodingTile';

import bookmark from './bookmark/BookmarkWidgetTile';
import calendar from './calendar/CalendarTile';
import dashdot from './dashDot/DashDotTile';
import date from './date/DateTile';
import dnsHoleControls from './dnshole/DnsHoleControls';
import dnsHoleSummary from './dnshole/DnsHoleSummary';
import networkTrafficTile from './download-speed/NetworkTrafficTile';
import healthMonitoring from './health-monitoring/HealthMonitoringTile';
import iframe from './iframe/IFrameTile';
import indexerManager from './indexer-manager/IndexerManagerTile';
import mediaRequestsList from './media-requests/MediaRequestListTile';
import mediaRequestsStats from './media-requests/MediaRequestStatsTile';
import mediaServer from './media-server/MediaServerTile';
import notebook from './notebook/NotebookWidgetTile';
import processesTile from './processes/ProcessesTile';
import rss from './rss/RssWidgetTile';
import smartHomeEntityState from './smart-home/entity-state/entity-state.widget';
import smartHomeTriggerAutomation from './smart-home/trigger-automation/trigger-automation.widget';
import usenet from './useNet/UseNetTile';
import videoStream from './video/VideoStreamTile';
import weather from './weather/WeatherTile';

export default {
  calendar,
  'indexer-manager': indexerManager,
  dashdot,
  usenet,
  weather,
  dlspeed: networkTrafficTile,
  processes: processesTile,
  date,
  rss,
  'video-stream': videoStream,
  iframe,
  'media-server': mediaServer,
  'media-requests-list': mediaRequestsList,
  'media-requests-stats': mediaRequestsStats,
  'dns-hole-summary': dnsHoleSummary,
  'dns-hole-controls': dnsHoleControls,
  bookmark,
  notebook,
  'smart-home/entity-state': smartHomeEntityState,
  'smart-home/trigger-automation': smartHomeTriggerAutomation,
  'health-monitoring': healthMonitoring,
  'media-transcoding': mediaTranscoding,
};
