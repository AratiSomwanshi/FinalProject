using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using eShopSystem.Data;

namespace eShopSystem.Controllers
{
    public class ShippingAddsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ShippingAddsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: ShippingAdds
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.ShippingAddes.Include(s => s.User);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: ShippingAdds/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var shippingAdd = await _context.ShippingAddes
                .Include(s => s.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (shippingAdd == null)
            {
                return NotFound();
            }

            return View(shippingAdd);
        }

        // GET: ShippingAdds/Create
        public IActionResult Create()
        {
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id");
            return View();
        }

        // POST: ShippingAdds/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserId,AddressLine1,AddressLine2,City,State,PostalCode,Country,IsDefault")] ShippingAdd shippingAdd)
        {
            if (ModelState.IsValid)
            {
                _context.Add(shippingAdd);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", shippingAdd.UserId);
            return View(shippingAdd);
        }

        // GET: ShippingAdds/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var shippingAdd = await _context.ShippingAddes.FindAsync(id);
            if (shippingAdd == null)
            {
                return NotFound();
            }
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", shippingAdd.UserId);
            return View(shippingAdd);
        }

        // POST: ShippingAdds/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserId,AddressLine1,AddressLine2,City,State,PostalCode,Country,IsDefault")] ShippingAdd shippingAdd)
        {
            if (id != shippingAdd.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(shippingAdd);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ShippingAddExists(shippingAdd.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", shippingAdd.UserId);
            return View(shippingAdd);
        }

        // GET: ShippingAdds/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var shippingAdd = await _context.ShippingAddes
                .Include(s => s.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (shippingAdd == null)
            {
                return NotFound();
            }

            return View(shippingAdd);
        }

        // POST: ShippingAdds/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var shippingAdd = await _context.ShippingAddes.FindAsync(id);
            if (shippingAdd != null)
            {
                _context.ShippingAddes.Remove(shippingAdd);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ShippingAddExists(int id)
        {
            return _context.ShippingAddes.Any(e => e.Id == id);
        }
    }
}
