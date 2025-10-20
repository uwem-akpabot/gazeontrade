import { Helmet } from 'react-helmet-async';
import { useEffect } from "react";
import Sidebar from '../../../_layouts/admin/Sidebar';
import Topbar from '../../../_layouts/admin/Topbar';
import Dash from '../../../_layouts/admin/Dash';
import Foot from '../../../_layouts/admin/Foot';

const Dashboard = (props) => {
  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false; // ensure sequential loading
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

    (async () => {
      // --- Load WebFont first ---
      await loadScript("/_admin/assets/js/plugin/webfont/webfont.min.js");

      // --- Then initialize fonts ---
      if (window.WebFont) {
        window.WebFont.load({
          google: { families: ["Public Sans:300,400,500,600,700"] },
          custom: {
            families: [
              "Font Awesome 5 Solid",
              "Font Awesome 5 Regular",
              "Font Awesome 5 Brands",
              "simple-line-icons",
            ],
            urls: ["/_admin/assets/css/fonts.min.css"],
          },
          active: function () {
            sessionStorage.fonts = true;
          },
        });
      }

      await loadScript("/_admin/assets/js/core/jquery-3.7.1.min.js");
      await loadScript("/_admin/assets/js/core/popper.min.js");
      await loadScript("/_admin/assets/js/core/bootstrap.min.js");
      await loadScript("/_admin/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js");
      await loadScript("/_admin/assets/js/plugin/chart.js/chart.min.js");
      await loadScript("/_admin/assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js");
      await loadScript("/_admin/assets/js/plugin/chart-circle/circles.min.js");
      await loadScript("/_admin/assets/js/plugin/datatables/datatables.min.js");
      await loadScript("/_admin/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js");
      await loadScript("/_admin/assets/js/plugin/jsvectormap/jsvectormap.min.js");
      await loadScript("/_admin/assets/js/plugin/jsvectormap/world.js");
      await loadScript("/_admin/assets/js/plugin/sweetalert/sweetalert.min.js");
      await loadScript("/_admin/assets/js/kaiadmin.min.js");
    })();
  }, []);

  return (
    <>
    <Helmet>
      <link rel="stylesheet" href="/_admin/assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/_admin/assets/css/plugins.min.css" />
      <link rel="stylesheet" href="/_admin/assets/css/kaiadmin.min.css" />
    </Helmet>

    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Topbar />

        <div className="container">
          <Dash page={props.page} company={props.company} />
        </div>

        <Foot />
      </div>
    </div>
    </>
  )
}
export default Dashboard;