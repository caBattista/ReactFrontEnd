import * as React from "react"
import { Button } from "@/components/low_level/button"
import { Sun, Moon } from "lucide-react"

function useTheme() {
  const [isDark, setIsDark] = React.useState<boolean>(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  )

  const toggle = React.useCallback(() => {
    const root = document.documentElement
    const nextIsDark = !root.classList.contains("dark")
    root.classList.toggle("dark", nextIsDark)
    localStorage.setItem("theme", nextIsDark ? "dark" : "light")
    setIsDark(nextIsDark)
  }, [])

  return { isDark, toggle }
}

export default function Settings() {
  const { isDark, toggle } = useTheme()
  return (
    <div className="h-full w-full">
      <Button variant="outline" size="sm" onClick={toggle} className="w-full justify-start">
					{isDark ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
					{isDark ? "Light mode" : "Dark mode"}
      </Button>
    </div>
  )
}