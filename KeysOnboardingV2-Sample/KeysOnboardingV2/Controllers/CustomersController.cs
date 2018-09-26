using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using KeysOnboardingV2.Models;

namespace KeysOnboardingV2.Controllers
{
    public class CustomersController : Controller
    {
        private KeysOnboardingV2Entities db = new KeysOnboardingV2Entities();

        // GET: Customers
        public ActionResult Index()
        {
            return View();
        }

        
        public JsonResult List()
        {
            var customers = db.Customers.Select(x => new 
            {
                Id = x.Id,
                Address = x.Address,
                Age = x.Age,
                CustomerName = x.CustomerName
            }).ToList();

            return Json(customers, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Customer cus)
        {
            db.Customers.Add(cus);

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var customer = db.Customers.Where(x => x.Id == ID).Select(x => new
            {
                Id = x.Id,
                CustomerName = x.CustomerName,
                Age = x.Age,
                Address = x.Address,
            }).FirstOrDefault();
            return Json(customer, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Customer cus)
        {
            db.Entry(cus).State = EntityState.Modified;

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult RemoveCustomer(int ID)
        {
            Customer customer = db.Customers.Find(ID);
            db.Customers.Remove(customer);
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
