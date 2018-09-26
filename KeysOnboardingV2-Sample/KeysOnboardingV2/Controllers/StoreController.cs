using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KeysOnboardingV2.Models;

namespace KeysOnboardingV2.Controllers
{
    public class StoreController : Controller
    {
        KeysOnboardingV2Entities db = new KeysOnboardingV2Entities();
        // GET: Store
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            var stores = db.Stores.Select(x => new
            {
                Id = x.Id,
                StoreName = x.StoreName,
                Address = x.Address,
                
            }).ToList();

            return Json(stores, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Store store)
        {
            db.Stores.Add(store);

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var store = db.Stores.Where(x => x.Id == ID).Select(x => new
            {

                Id = x.Id,
                StoreName = x.StoreName,
                Address = x.Address,

            }).FirstOrDefault();

            return Json(store, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Store store)
        {
            db.Entry(store).State = EntityState.Modified;

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult RemoveStore(int ID)
        {
            Store store = db.Stores.Find(ID);
            db.Stores.Remove(store);
            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

