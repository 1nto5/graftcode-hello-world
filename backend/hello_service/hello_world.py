from datetime import datetime


class HelloService:
    """A simple service exposed via Graftcode Gateway.

    Every public method in this class becomes callable from any language
    through the auto-generated Graftcode SDK.
    """

    def hello(self, name: str) -> str:
        return f"Hello, {name}! Greetings from a Python backend via Graftcode."

    def get_time(self) -> str:
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
