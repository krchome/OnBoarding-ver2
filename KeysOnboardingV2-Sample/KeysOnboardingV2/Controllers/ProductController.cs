using KeysOnboardingV2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;

namespace KeysOnboardingV2.Controllers
{
    public class ProductController : Controller
    {
       private KeysOnboardingV2Entities db = new KeysOnboardingV2Entities();
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            var product = db.Products.Select(x => new
            {
                Id = x.Id,
                ProductName = x.ProductName,
                Price = x.Price,

            }).ToList();

            return Json(product, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Product product)
        {
            db.Products.Add(product);

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var product = db.Products.Where(x => x.Id == ID).Select(x => new
            {

                Id = x.Id,
                ProductName = x.ProductName,
                Price = x.Price,

            }).FirstOrDefault();
            return Json(product, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Product product)
        {
            db.Entry(product).State = EntityState.Modified;

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult RemoveProduct(int ID)
        {
            Product product = db.Products.Find(ID);
            db.Products.Remove(product);
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
