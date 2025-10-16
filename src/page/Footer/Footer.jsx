import { Mail, Twitter, Facebook, Instagram, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:1337/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setEmail("");
      } else {
        console.error("Subscription failed:", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="  bg-white pt-48">
        {/* Newsletter Section */}
        {/* Footer */}
        {/* <div className="w-full h-48 bg-white"></div> */}
        <footer className="bg-gray-100 pt-32 pb-6 px-4   rounded-b-3xl relative">
          <section className="py-8 px-4 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
            <div className="max-w-7xl mx-auto">
              <div className="bg-black rounded-3xl px-8 py-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="text-center lg:text-left">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                      STAY UP TO DATE ABOUT
                      <br />
                      OUR LATEST OFFERS
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4 w-full lg:w-auto lg:min-w-[350px]">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="pl-12 py-4 rounded-full bg-white text-black border-0 text-base"
                        disabled={loading}
                        type="email"
                      />
                    </div>
                    <Button
                      onClick={handleSubscribe}
                      disabled={loading}
                      className="bg-white text-black hover:bg-gray-100 py-4 rounded-full font-medium text-base"
                    >
                      {loading ? "Sending..." : "Subscribe to Newsletter"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="text-2xl font-bold text-black mb-4">
                  SHOP.CO
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  We have clothes that suits your style and which you're proud
                  to wear. From women to men.
                </p>
                <div className="flex items-center gap-3">
                  <button className="p-2 bg-white rounded-full hover:bg-gray-50 transition-colors">
                    <Twitter className="h-4 w-4 text-black cursor-pointer" />
                  </button>
                  <button className="p-2 bg-black rounded-full hover:bg-gray-800 transition-colors">
                    <Facebook className="h-4 w-4 text-white cursor-pointer" />
                  </button>
                  <button className="p-2 bg-white rounded-full hover:bg-gray-50 transition-colors">
                    <Instagram className="h-4 w-4 text-black cursor-pointer" />
                  </button>
                  <button className="p-2 bg-white rounded-full hover:bg-gray-50 transition-colors">
                    <Github className="h-4 w-4 text-black cursor-pointer" />
                  </button>
                </div>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="font-semibold text-black mb-4 tracking-wider">
                  COMPANY
                </h3>
                <ul className="space-y-3 text-gray-500 text-sm tracking-wide">
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Works
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Career
                    </a>
                  </li>
                </ul>
              </div>

              {/* Help Links */}
              <div>
                <h3 className="font-semibold text-black mb-4 tracking-wider">
                  HELP
                </h3>
                <ul className="space-y-3 text-gray-500 text-sm tracking-wide">
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Customer Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Delivery Details
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* FAQ Links */}
              <div>
                <h3 className="font-semibold text-black mb-4 tracking-wider">
                  FAQ
                </h3>
                <ul className="space-y-3 text-gray-500 text-sm tracking-wide">
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Account
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Manage Deliveries
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Orders
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Payments
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h3 className="font-semibold text-black mb-4 tracking-wider">
                  RESOURCES
                </h3>
                <ul className="space-y-3 text-gray-500 text-sm tracking-wide">
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Free eBooks
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Development Tutorial
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      How to - Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Youtube Playlist
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-300 pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-gray-500 text-sm">
                  Shop.co © 2000-2023, All Rights Reserved
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-white px-2 py-1 rounded ">
                    <span className="text-blue-600 font-bold text-sm">
                      VISA
                    </span>
                  </div>
                  <div className="bg-white px-2 py-1 rounded ">
                    <div className="flex">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <div className="w-4 h-4 bg-yellow-500 rounded-full -ml-2"></div>
                    </div>
                  </div>
                  <div className="bg-white px-2 py-1 rounded ">
                    <span className="text-blue-600 font-bold text-sm">
                      PayPal
                    </span>
                  </div>
                  <div className="bg-white px-2 py-1 rounded ">
                    <span className="text-black font-bold text-sm">Pay</span>
                  </div>
                  <div className="bg-white px-2 py-1 rounded ">
                    <span className="text-blue-500 font-bold text-sm">
                      G Pay
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
