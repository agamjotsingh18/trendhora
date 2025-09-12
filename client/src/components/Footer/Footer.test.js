import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "./Footer";

// Mock window.scrollTo
Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});

// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
  ToastContainer: () => <div>ToastContainer</div>,
}));

describe("Footer Component", () => {
  beforeEach(() => {
    window.scrollTo.mockClear();
    jest.clearAllMocks();
  });

  test("renders footer sections correctly", () => {
    render(<Footer />);

    // Check main sections
    expect(screen.getByText("TrendHora")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Stay Connected")).toBeInTheDocument();
    expect(screen.getByText("Join Our Newsletter")).toBeInTheDocument();
  });

  test("renders help section links", () => {
    render(<Footer />);

    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Refund")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Accessbility")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  test("renders contact information", () => {
    render(<Footer />);

    expect(screen.getByText("+91 93190-42075")).toBeInTheDocument();
    expect(screen.getByText("shop@trendhora.com")).toBeInTheDocument();
    expect(screen.getByText("Delhi, India")).toBeInTheDocument();
  });

  test("renders social media links with proper URLs", () => {
    render(<Footer />);

    const twitterLink = screen.getByLabelText("Follow us on Twitter");
    expect(twitterLink).toHaveAttribute(
      "href",
      "https://twitter.com/trendhora"
    );

    const instagramLink = screen.getByLabelText("Follow us on Instagram");
    expect(instagramLink).toHaveAttribute(
      "href",
      "https://instagram.com/trendhora"
    );

    const youtubeLink = screen.getByLabelText(
      "Subscribe to our YouTube channel"
    );
    expect(youtubeLink).toHaveAttribute(
      "href",
      "https://youtube.com/trendhora"
    );

    const telegramLink = screen.getByLabelText("Join us on Telegram");
    expect(telegramLink).toHaveAttribute("href", "https://t.me/trendhora");

    const pinterestLink = screen.getByLabelText("Follow us on Pinterest");
    expect(pinterestLink).toHaveAttribute(
      "href",
      "https://pinterest.com/trendhora"
    );
  });

  test("renders newsletter section with benefits", () => {
    render(<Footer />);

    expect(screen.getByText("Exclusive discounts")).toBeInTheDocument();
    expect(screen.getByText("New product alerts")).toBeInTheDocument();
    expect(screen.getByText("Fashion tips")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Subscribe to newsletter" })
    ).toBeInTheDocument();
  });

  test("renders copyright and legal links", () => {
    render(<Footer />);

    expect(screen.getByText("©2025 TrendHora")).toBeInTheDocument();
    expect(screen.getByText("Terms & Condition")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
  });

  test("scroll to top button appears when scrolled", () => {
    render(<Footer />);

    // Mock scroll position
    Object.defineProperty(window, "pageYOffset", {
      value: 400,
      writable: true,
    });

    // Trigger scroll event
    fireEvent.scroll(window);

    const scrollButton = screen.getByLabelText("Scroll to top");
    expect(scrollButton).toBeInTheDocument();
  });

  test("scroll to top button functionality", () => {
    render(<Footer />);

    // Set scroll position to make button visible
    Object.defineProperty(window, "pageYOffset", {
      value: 400,
      writable: true,
    });
    fireEvent.scroll(window);

    const scrollButton = screen.getByLabelText("Scroll to top");
    fireEvent.click(scrollButton);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  test("renders enhanced UI elements with proper styling", () => {
    render(<Footer />);

    // Check if main footer container exists
    const footer = document.querySelector("footer");
    expect(footer).toBeInTheDocument();

    // Check if social links container exists
    const socialLinks = document.querySelector(".footer__social__links");
    expect(socialLinks).toBeInTheDocument();

    // Check if newsletter container exists
    const newsletter = document.querySelector(".footer__newsletter__container");
    expect(newsletter).toBeInTheDocument();
  });

  test("phone number is clickable", () => {
    render(<Footer />);

    const phoneLink = screen.getByText("+91 93190-42075");
    expect(phoneLink.closest("a")).toHaveAttribute("href", "tel:+919319042075");
  });

  test("email is clickable", () => {
    render(<Footer />);

    const emailLink = screen.getByText("shop@trendhora.com");
    expect(emailLink.closest("a")).toHaveAttribute(
      "href",
      "mailto:agamjotsingh1801@gmail.com"
    );
  });

  test("newsletter form shows error for empty submission", async () => {
    render(<Footer />);

    const submitButton = screen.getByRole("button", {
      name: "Subscribe to newsletter",
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const { toast } = require("react-toastify");
      expect(toast.error).toHaveBeenCalledWith(
        "Please enter your email address",
        expect.anything()
      );
    });
  });

  test("newsletter form shows error for invalid email", async () => {
    render(<Footer />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const submitButton = screen.getByRole("button", {
      name: "Subscribe to newsletter",
    });

    userEvent.type(emailInput, "invalid-email");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const { toast } = require("react-toastify");
      expect(toast.error).toHaveBeenCalledWith(
        "Please enter a valid email address",
        expect.anything()
      );
    });
  });

  test("newsletter form successfully submits with valid email", async () => {
    render(<Footer />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const submitButton = screen.getByRole("button", {
      name: "Subscribe to newsletter",
    });

    userEvent.type(emailInput, "test@example.com");
    fireEvent.click(submitButton);

    // Button should show loading state
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      const { toast } = require("react-toastify");
      expect(toast.success).toHaveBeenCalled();
    });

    // Email input should be cleared after submission
    expect(emailInput.value).toBe("");
  });
});
