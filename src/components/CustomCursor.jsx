import { useEffect } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");
    if (!cursor || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, {
        x: mouseX - 6,
        y: mouseY - 6,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const tick = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      gsap.set(follower, { x: followerX - 18, y: followerY - 18 });
      requestAnimationFrame(tick);
    };

    const addHover = () => {
      cursor.classList.add("hover-state");
      follower.classList.add("hover-state");
    };

    const removeHover = () => {
      cursor.classList.remove("hover-state");
      follower.classList.remove("hover-state");
    };

    window.addEventListener("mousemove", onMove);

    const rafId = requestAnimationFrame(tick);

    const attachListeners = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    };

    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor" />
      <div id="cursor-follower" />
    </>
  );
}
