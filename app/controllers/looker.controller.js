const { LookerNodeSDK } = require("@looker/sdk-node");
// const sdk = LookerNodeSDK.init40({
//   base_url: process.env.base_url,
//   client_id: process.env.client_id,
//   client_secret: process.env.client_secret,
// });

const sdk = LookerNodeSDK.init40();

const getLookerDashboards = async (req, res) => {
  try {
    let response = await sdk.ok(sdk.all_dashboards());
    console.log("total looker dashboards ==>", response.length);
    res.json({ success: true, lookerDashboards: response });
  } catch (error) {
    console.error("Error getting looker dashboards:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getLookerSingleDashboard = async (req, res) => {
  const dashboardId = req?.params?.id;
  try {
    let response = await sdk.ok(sdk.dashboard(dashboardId));
    console.log("getLookerSingleDashboard ==>", response);
    res.json({ success: true, dashboard: response });
  } catch (error) {
    console.error("Error getting looker single dashboard:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// const downloadLookImage = async (req, res) => {
//   const queryId = req?.params?.id;
//   console.log("query id", queryId);
//   try {
//     let render_task_response = await sdk.ok(
//       sdk.create_query_render_task(queryId, "jpg", 100, 100)
//     );
//     console.log("downloadLookImage ==>", render_task_response.id);
//     let lookImageData = {
//       width: render_task_response.width,
//       height: render_task_response.height,
//     };
//     setTimeout(async () => {
//       let response = await sdk.ok(
//         sdk.render_task_results(render_task_response.id.toString())
//       );
//       console.log("downloadLookImage ==>", response);
//       lookImageData.imageData = response;
//       res.json({ success: true, lookImage: lookImageData });
//     }, 15000);
//   } catch (error) {
//     console.error("Error downloadLookImage:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// };

const downloadLookImage = async (req, res) => {
  const queryId = req?.params?.id;
  console.log("query id", queryId);
  try {
    let render_task_response = await sdk.ok(
      sdk.create_query_render_task(queryId, "jpg", 100, 100)
    );
    console.log("downloadLookImage ==>", render_task_response.id);

    let renderTaskResult;
    let lookImageData = {
      width: render_task_response.width,
      height: render_task_response.height,
    };


    while (!renderTaskResult || renderTaskResult.status !== 'success') {
      renderTaskResult = await sdk.ok(sdk.render_task(render_task_response.id.toString()));
      console.log('Render Task Status:', renderTaskResult.status);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    let response = await sdk.ok(
      sdk.render_task_results(render_task_response.id.toString())
    );
    lookImageData.imageData = response;

    res.json({ success: true, lookImage: lookImageData });
  } catch (error) {
    console.error("Error downloadLookImage:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


module.exports = {
  getLookerDashboards,
  getLookerSingleDashboard,
  downloadLookImage,
};
