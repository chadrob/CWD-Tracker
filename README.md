# CWD-Tracker
This project gathers and analyzes Chronic Wasting Disease (CWD) data posted by the Saskatchewan government. The data consists of test results (positive/negative/untestable) for each tested deer, identified by a tracking number, that are taken by hunters throughout Saskatchewan. The data is released weekly in a PDF file containing ~700 results. Unfortunately, old results are not shown online and with each new posting hunters may miss out on viewing their results.

CWD Tracker aims to alert hunters when their test results are ready, thereby eliminating the need to manually check for new posts and guarantees results won't be missed. 

So far, the program uses a command line interface, and can be run by:
  - node index.js update                        => update database
  - node index.js analyze                       => view healthy vs sick percentage
  - node index.js find [trackingNumber]         => search database for tracking number
