// Impact calculation function
function calculateImpact() {
  const itemsInput = document.getElementById("itemsCount");
  const items = parseInt(itemsInput.value);
  const resultElement = document.getElementById("impactResult");
  
  if (!items || items <= 0) {
    resultElement.innerHTML = '<span style="color: #dc3545;">⚠️ Please enter a valid number greater than 0.</span>';
    itemsInput.focus();
    return;
  }

  const plasticSaved = (items * 0.15).toFixed(2); // 150g per item saved
  const co2Reduced = (items * 0.3).toFixed(2);     // 300g per item
  const treesEquivalent = (items * 0.02).toFixed(2); // 2% of a tree per item

  resultElement.innerHTML = `
    <div style="background: linear-gradient(135deg, #d4edda, #c3e6cb); padding: 1rem; border-radius: 8px; border-left: 4px solid #28a745;">
      <strong>🌍 Your Impact:</strong><br>
      • Saved ${plasticSaved} kg of plastic waste<br>
      • Reduced ${co2Reduced} kg of CO₂ emissions<br>
      • Equivalent to planting ${treesEquivalent} trees
    </div>
  `;
}

// Shopping cart functionality
let cart = [];

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  updateCartUI();
  showNotification(`${productName} added to cart!`);
}

function updateCartUI() {
  const cartCount = cart.length;
  // You can add a cart icon in the header to show the count
  console.log(`Cart has ${cartCount} items`);
}

function showNotification(message) {
  // Create a simple notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-signup form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (!email) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.textContent = '✓ Subscribed!';
        submitBtn.style.backgroundColor = '#28a745';
        emailInput.value = '';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
        }, 2000);
      }, 1000);
    });
  }
  
  // Volunteer button
  const volunteerBtn = document.querySelector('.volunteer-btn');
  if (volunteerBtn) {
    volunteerBtn.addEventListener('click', function() {
      this.textContent = 'Thank you for your interest!';
      this.style.backgroundColor = '#28a745';
      setTimeout(() => {
        this.textContent = 'Become a Volunteer';
        this.style.backgroundColor = '';
      }, 3000);
    });
  }
  
  // Donate button
  const donateBtn = document.querySelector('.donate-btn');
  if (donateBtn) {
    donateBtn.addEventListener('click', function() {
      this.textContent = 'Redirecting to payment...';
      this.style.backgroundColor = '#28a745';
      setTimeout(() => {
        this.textContent = 'Donate Now';
        this.style.backgroundColor = '';
      }, 3000);
    });
  }
  
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('h4').textContent;
      const priceText = productCard.querySelector('p').textContent;
      
      // Extract price from text (e.g., "₹90 / kg" -> 90)
      const price = parseFloat(priceText.match(/₹(\d+)/)[1]);
      
      addToCart(productName, price);
      
      // Visual feedback
      this.textContent = 'Added!';
      this.style.backgroundColor = '#28a745';
      setTimeout(() => {
        this.textContent = 'Add to Cart';
        this.style.backgroundColor = '';
      }, 1500);
    });
  });
  
  // Add smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add loading animation for product cards
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Add input validation for impact calculator
  const itemsInput = document.getElementById("itemsCount");
  if (itemsInput) {
    itemsInput.addEventListener('input', function() {
      const value = this.value;
      if (value && (isNaN(value) || parseInt(value) < 0)) {
        this.style.borderColor = '#dc3545';
      } else {
        this.style.borderColor = '#e0e0e0';
      }
    });
  }
  
  // Add hover effects for all interactive cards
  const interactiveCards = document.querySelectorAll('.feature-card, .testimonial-card, .tip-card, .delivery-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Add scroll-based animations
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    if (scrollY > sectionTop - windowHeight * 0.8) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
});

// Initialize page animations
window.addEventListener('load', function() {
  document.body.style.opacity = '1';
  
  // Animate hero stats
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const finalValue = stat.textContent;
    const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
    let currentValue = 0;
    const increment = numericValue / 50;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= numericValue) {
        stat.textContent = finalValue;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '') + (finalValue.includes('%') ? '%' : '');
      }
    }, 50);
  });
  
  // Animate impact stats
  const impactStats = document.querySelectorAll('.impact-number');
  impactStats.forEach(stat => {
    const finalValue = parseInt(stat.textContent.replace(/,/g, ''));
    let currentValue = 0;
    const increment = finalValue / 100;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= finalValue) {
        stat.textContent = finalValue.toLocaleString();
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(currentValue).toLocaleString();
      }
    }, 30);
  });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);
  